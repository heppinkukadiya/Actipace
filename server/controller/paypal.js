import paypal from "@paypal/checkout-server-sdk";
import { PrismaClient } from "@prisma/client";
import { getPayPalClient } from "../utils/paypal.js";
import { mailSender } from "../utils/mailSender.js";
import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();

// ✅ for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ======================================================
// ✅ 1) Create PayPal Order (Same like Razorpay capturePayment)
// ======================================================
export const capturePayPalPayment = async (req, res) => {
    try {
        const {
            device,
            year,
            id,
            curr,
            amount,
            confirmEmail,
            country,
            email,
            fullName,
            gstin,
            phoneNumber,
            policyAccepted,
            termsAccepted,
        } = req.body;

        // ✅ same validation like razorpay
        if (email !== confirmEmail) {
            return res.json({
                success: false,
                message: "email and comfirmemail is differ",
            });
        }

        if (!policyAccepted || !termsAccepted) {
            return res.json({
                success: false,
                message: "Please acccept the terms and policiy",
            });
        }

        if (!device || !year || !id || !curr || !amount) {
            return res.json({
                success: false,
                message: "please provide valid plan id",
            });
        }

        let plan;

        try {
            plan = await prisma.softwarePlan.findFirst({
                where: {
                    devices: Number(device),
                    year: Number(year),
                    software_id: Number(id),
                },
            });

            if (!plan) {
                return res.json({
                    success: false,
                    message: "could not find the plan",
                });
            }
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({
                success: false,
                message: "something went wrong in purchasing plan",
            });
        }

        // ✅ SAME LIKE RAZORPAY: order create
        try {
            // PayPal currency support (you can allow INR if your account supports)
            const currencyCode =  "USD";

            // PayPal amount must be string & 2 decimals
            const orderAmount = Number(amount).toFixed(2);

            const client = getPayPalClient();
            const request = new paypal.orders.OrdersCreateRequest();
            request.prefer("return=representation");

            request.requestBody({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: currencyCode,
                            value: orderAmount,
                        },
                        custom_id: email,
                    },
                ],
            });

            const order = await client.execute(request);
            const paypalOrderId = order.result.id;

            // ✅ SAME LIKE RAZORPAY: add order in your custom api2.php
            const ress = await axios.get(
                `https://actipace.com/091224/api2.php?action=add&orderid=${paypalOrderId}`
            );

            if (ress.data.success === 0) {
                return res.status(401).json({
                    success: false,
                    message: "orderId is not correct",
                });
            } else if (ress.data.success === 2) {
                return res.status(401).json({
                    success: false,
                    message: "orderId Already exists",
                });
            }

            // ✅ SAME LIKE RAZORPAY: create purchase record
            const purchaseed = await prisma.purchase.create({
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

                    paypalOrderId: paypalOrderId,
                    status: "PENDING",
                },
            });

            return res.status(200).json({
                success: true,
                 paypalOrderId, // ✅ SAME KEY NAME LIKE RAZORPAY
                currency: currencyCode,
                amount: Number(orderAmount),
                plan,
                email,
            });
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({
                success: false,
                message: "error in payment generation",
            });
        }
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: "could not initiate order",
        });
    }
};

// ======================================================
// ✅ 2) Verify PayPal Payment (Same like Razorpay verifySignature)
// ======================================================
export const verifyPayPalPayment = async (req, res) => {
    try {
        const { paypalOrderId } = req.body;

        if (!paypalOrderId) {
            return res.status(400).json({
                success: "false",
                message: "fields is missing",
            });
        }

        // ✅ SAME LIKE RAZORPAY: find purchase record
        const currentPurchase = await prisma.purchase.findFirst({
            where: { paypalOrderId: paypalOrderId },
            include: { softwarePlan: true, software: true },
        });

        if (!currentPurchase) {
            return res.status(404).json({
                success: false,
                message: "Purchase record not found",
            });
        }

        // ✅ capture payment (PayPal equivalent of signature verify)
        const client = getPayPalClient();
        const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
        request.requestBody({});

        const capture = await client.execute(request);

        const status = capture?.result?.status;

        const captureId =
            capture?.result?.purchase_units?.[0]?.payments?.captures?.[0]?.id || null;

        if (status !== "COMPLETED") {
            return res.status(500).json({
                success: false,
                message: "payment is not authoriszed",
            });
        }


        try {
            // ✅ SAME product mapping
            let pr = "";
            if (currentPurchase.software.software_id === 1) {
                pr = "ts";
            } else if (currentPurchase.software.software_id === 2) {
                pr = "is";
            } else {
                pr = "bd";
            }

            // ✅ SAME client api calling
            const parts = await axios.get(
                `https://actipace.com/091224/api.php?orderid=${paypalOrderId}&product=${pr}&devices=${currentPurchase.softwarePlan.devices}&validity=${
                    currentPurchase.softwarePlan.year * 365
                }`
            );

            const ky = parts.data.split("@");
            const codes = ky.slice(1);


            // ✅ SAME email template
            const emailTemplatePath = path.join(
                __dirname,
                "../templet/mailtemplet.html"
            );
            const emailTemplate = fs.readFileSync(emailTemplatePath, "utf8");

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
                .join("");

            const populatedTemplate = emailTemplate
                .replace("{{date}}", orderDetails.date)
                .replace("{{orderNumber}}", orderDetails.orderNumber)
                .replace("{{product}}", orderDetails.product)
                .replace("{{amount}}", orderDetails.amount)
                .replace("{{validity}}", orderDetails.validity)
                .replace("{{licenseKeys}}", licenseKeysHtml);

            // ✅ SAME email send


            const getProductPrefix = (softwareId) => {
                if (softwareId === 1) return "TS";
                if (softwareId === 2) return "IS";
                return "BD";
            };

            const buildProductCode = ({ softwareId, devices, year }) => {
                const prefix = getProductPrefix(Number(softwareId));
                return `${prefix}${devices}U${year}Y`;
            };

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

// ✅ only include GST if user entered GSTIN
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





            mailSender(currentPurchase.email, "your device licence keys", populatedTemplate)
                .catch(err => {
                    console.error("Email failed:", err.message);
                });

            // ✅ SAME IST expiry logic
            const IST_OFFSET = 5.5 * 60 * 60 * 1000;
            const currentDate = new Date();
            const currentTimeInIST = currentDate.getTime() + IST_OFFSET;

            const purchaseDate = new Date(currentTimeInIST);
            const expirationDate = new Date(currentTimeInIST);
            expirationDate.setFullYear(
                expirationDate.getFullYear() + currentPurchase.softwarePlan.year
            );

            // ✅ SAME purchase update like razorpay
            await prisma.purchase.update({
                where: { purchase_id: currentPurchase.purchase_id },
                data: {
                    paypalCaptureId: captureId,
                    status: "SUCCESS",
                    expiresAt: expirationDate,
                    purchase_date: purchaseDate,
                },
            });

            return res.status(200).json({
                success: true,
                message: "Payment verified and purchase updated",
                DownloadLink: currentPurchase.software.description,
                expire: expirationDate,
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                success: false,
                message: "action is not fulfiled",
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "PayPal action is not fulfiled",
        });
    }
};
