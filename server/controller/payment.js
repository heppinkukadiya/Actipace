const {instance} = require("../config/razorpay");
const { PrismaClient } = require('@prisma/client');
const { mailSender } = require('../utils/mailSender');
const fs = require('fs');
const prisma = new PrismaClient();
const crypto = require("crypto");
require("dotenv").config();
const axios = require('axios');
const path = require('path');

exports.capturePayment = async (req,res) =>{
    try{

        const {device,year,id,curr,amount ,confirmEmail,
            country,
            email,
            fullName,
            gstin,
            phoneNumber,
            policyAccepted,
            termsAccepted,} = req.body;

            if(email !== confirmEmail)
            {
                return res.json({
                    success:false,
                    message:"email and comfirmemail is differ"
                })
            }

            if(!policyAccepted || !termsAccepted)
            {
                return res.json({
                    success:false,
                    message:"Please acccept the terms and policiy"
                })
            }
        //console.log(req.body)
        //console.log("capturepayment......",req.user.userId);
        // const user_id = req.user.userId;
        //console.log(req.body);
        if(!device || !year || !id || !curr || !amount){
            return res.json({
                success:false,
                message:"please provide valid plan id"
            })
        }

        let plan;

        try{

           plan = await prisma.softwarePlan.findFirst({where:{devices:Number(device),year:Number(year),software_id:id}});
           if(!plan)
           {
                return res.json({
                    success:false,
                    message:"could not find the plan"
                })
           }
          // console.log("plan",plan)

           //user allready purchase same course

        //    const purchased = await prisma.purchase.findFirst({where:{plan_id:plan.plan_id,user_id:user_id}});

        //    if(purchased.status === "SUCCESS")
        //    {
        //         return res.json({
        //             success:false,
        //             message:"plan already purchased"
        //         })
        //    }

        }catch(e){
            console.log(e.message);
            return res.status(500).json({
                success:false,
                message:"something went wrong in purchasing plan"
            })
        }

        //order create
        //option
        let amu;
        if(curr === "INR")
        {
            amu = Math.round(amount*100)
        }
        else amu = amount*100;
        const option ={
            amount:amu,
            currency:curr,
            receipt:Math.random(Date.now()).toString(),
            notes:{
                email:email
            }
        }

        //console.log("option",option);
        //payment
        try{

            const paymentResponse = await instance.orders.create(option);
            //console.log("res",paymentResponse)



            const ress = await axios.get(`https://actipace.com/091224/api2.php?action=add&orderid=${paymentResponse.id}`)
            //console.log(ress);

            if(ress.data.success === 0)
            {
                return res.status(401).json({
                    success:false,
                    message:"orderId is not correct"
                })
            }

            else if(ress.data.success === 2)
            {
                return res.status(401).json({
                    success:false,
                    message:"orderId Already exists"
                })
            }


            const purchaseed =await prisma.purchase.create({
                                    data: {
                                        email,
                                        fullName,
                                        phoneNumber,
                                        gstin,
                                        country,
                                        policyAccepted,
                                        termsAccepted,
                                        plan_id: plan.plan_id,
                                        software_id: plan.software_id,
                                        orderId: paymentResponse.id,
                                        status: "PENDING",
                                    },
                                })
            //console.log(purchaseed);

            // const transect = await prisma.transaction.create({
            //                     data:{
            //                         purchase_id:purchaseed.purchase_id,
            //                         razorpay_payment_id:paymentResponse.id,
            //                         amount:paymentResponse.amount,
            //                         status:"pending"
            //                     }
            //                 })
            // console.log(transect);

            return res.status(200).json({
                success:true,
                payment_id:paymentResponse.id,
                currency:paymentResponse.currency,
                amount:paymentResponse.amount/100,
                plan,
                email
            })

        }catch(e){
            console.log(e.message);
            return res.status(500).json({
                success:false,
                message:"error in payment generation"
            })
        }

    }catch(e){
        console.log(e.message);
            return res.status(500).json({
                success:false,
                message:"could not initiate order"
            })

    }
}

exports.verifySignature = async (req,res) =>{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    console.log(req.body);

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
        return res.status(400).json({
            success:"false",
            message:"fields is missing"
        })
    }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

    // console.log(razorpay_signature);
    // console.log(expectedSignature);

    if(razorpay_signature === expectedSignature)
    {
        console.log("payment is  Authorised");

        //const {email} = req.body.payload.payment.entity.notes;

        try{
            //action fullfilment
            // const compelet = await prisma.purchase.findUnique({where:{orderId:razorpay_order_id}});
            // console.log(compelet);
            // const purchase_id=compelet.purchase_id

            // const update = await prisma.transaction.update({where:{purchase_id}},{data:{status:"success"}});

            //emailsent

            //successfull
            const currentPurchase = await prisma.purchase.findFirst({
                where: { orderId: razorpay_order_id},
                include:{softwarePlan:true,software:true}
            });

            if (!currentPurchase) {
                            return res.status(404).json({
                                success: false,
                                message: "Purchase record not found",
                            });
                        }

                        let pr="";
                        if(currentPurchase.software.software_id === 1)
                        {
                            pr="ts"
                        }
                        else if(currentPurchase.software.software_id === 2)
                        {
                            pr="is"
                        }
                        else
                        {
                            pr="bd"
                        }
                        //client api calling

                        const parts = await axios.get(`https://actipace.com/091224/api.php?orderid=${razorpay_order_id}&product=${pr}&devices=${currentPurchase.softwarePlan.devices}&validity=${currentPurchase.softwarePlan.year*365}`)

                        // console.log(keys.data);

                        const ky = parts.data.split("@")
            //const count = parseInt(ky[0], 10);
                        const codes = ky.slice(1);
                        console.log("codes",codes);

                        const emailTemplatePath = path.join(__dirname, '../templet/mailtemplet.html');
                        const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');

                        let price = currentPurchase.softwarePlan.price;

                        price = Number(price);
                        price = Number((price * 1.18).toFixed(2));

                        const orderDetails = {
                            date: new Date().toLocaleDateString(),
                            orderNumber: currentPurchase.purchase_id,
                            product: currentPurchase.software.name,
                            amount: price,
                            validity: `${currentPurchase.softwarePlan.year} year`,
                            licenseKeys: codes,
                          };

                          const licenseKeysHtml = orderDetails.licenseKeys
                                                    .map((key) => `<li>${key}</li>`)
                                                    .join('');

                            const populatedTemplate = emailTemplate
                            .replace('{{date}}', orderDetails.date)
                            .replace('{{orderNumber}}', orderDetails.orderNumber)
                            .replace('{{product}}', orderDetails.product)
                            .replace('{{amount}}', orderDetails.amount)
                            .replace('{{validity}}', orderDetails.validity)
                            .replace('{{licenseKeys}}', licenseKeysHtml);
           // console.log("ky",ky);


            mailSender(currentPurchase.email, "your device licence keys", populatedTemplate)
                .catch(err => {
                    console.error("Email failed:", err.message);
                });

            const getProductPrefix = (softwareId) => {
                if (Number(softwareId) === 1) return "TS";
                if (Number(softwareId) === 2) return "IS";
                return "BD";
            };

            const buildProductCode = ({ softwareId, devices, year }) => {
                const prefix = getProductPrefix(softwareId);
                return `${prefix}${devices}U${year}Y`;
            };

            // ✅ Build Product Code like TS1U1Y / IS2U3Y / BD5U3Y
            const product_code = buildProductCode({
                softwareId: currentPurchase.software.software_id,
                devices: currentPurchase.softwarePlan.devices,
                year: currentPurchase.softwarePlan.year,
            });

            const invoiceParams = {
                name: currentPurchase.fullName,
                email: currentPurchase.email,
                product_code,
                paid: price,
            };

            if (currentPurchase.gstin && currentPurchase.gstin.trim() !== "") {
                invoiceParams.gst = currentPurchase.gstin;
            }



            axios
                .get("https://actipace.com/invoice/api.php", {
                    params: invoiceParams,
                })
                .catch(err => {
                    console.error("Invoice API failed:", err.message);
                });



            const IST_OFFSET = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
            const currentDate = new Date(); // Current UTC time

            // Calculate IST time
            const currentTimeInIST = currentDate.getTime() + IST_OFFSET;

            // Set purchase date and expiration date
            const purchaseDate = new Date(currentTimeInIST);
            const expirationDate = new Date(currentTimeInIST); // Current time in IST
            expirationDate.setFullYear(expirationDate.getFullYear() + currentPurchase.softwarePlan.year);

            await prisma.purchase.update({
                where: { purchase_id: currentPurchase.purchase_id },
                data: {
                    paymentId: razorpay_payment_id,
                    status: "SUCCESS",
                    expiresAt: expirationDate,
                    purchase_date:purchaseDate
                },
            });




            return res.status(200).json({
                success: true,
                message: "Payment verified and purchase updated",
                DownloadLink : currentPurchase.software.description,
                expire:expirationDate
            });


        }catch(e){
            console.log(e);
            return res.status(500).json({

                success:false,
                message:"action is not fulfilled"
            })

        }
    }
    else
    {
        return res.status(500).json({
            success:false,
            message:"payment is not authorised"
        })
    }
}
