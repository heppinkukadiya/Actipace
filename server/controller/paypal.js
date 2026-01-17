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

/**
 * ✅ 1) Create PayPal Order (Same like Razorpay capturePayment)
 * Route: POST /api/v1/paypal/create-order
 */
export const capturePayPalPayment = async (req, res) => {
    try {
        const {
            device,
            year,
            id, // software_id
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

        // ✅ validations (same style as Razorpay)
        if (email !== confirmEmail) {
            return res.json({
                success: false,
                message: "email and confirmEmail is different",
            });
        }

        if (!policyAccepted || !termsAccepted) {
            return res.json({
                success: false,
                message: "Please accept the terms and policy",
            });
        }

        if (!device || !year || !id) {
            return res.json({
                success: false,
                message: "please provide valid plan details",
            });
        }

        // ✅ find plan
        const plan = await prisma.softwarePlan.findFirst({
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

        // ✅ PayPal best currency = USD
        const currencyCode = "USD";

        // ✅ Always use DB price (safer than frontend)
        const orderAmount = plan.price.toString();

        // ✅ Create PayPal order
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
                    custom_id: email, // optional
                },
            ],
        });

        const order = await client.execute(request);
        const paypalOrderId = order.result.id;

        // ✅ save purchase in DB (PENDING)
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

                paymentProvider: "PAYPAL",
                paypalOrderId,
                status: "PENDING",
            },
        });

        return res.status(200).json({
            success: true,
            paypalOrderId,
            currency: currencyCode,
            amount: orderAmount,
            plan,
            email,
            purchase_id: purchaseed.purchase_id,
        });
    } catch (err) {
        console.log("PayPal create order error:", err);
        return res.status(500).json({
            success: false,
            message: "error in PayPal payment generation",
            error: err.message,
        });
    }
};

/**
 * ✅ 2) Verify + Capture PayPal Payment (Same like Razorpay verifySignature)
 * Route: POST /api/v1/paypal/verify
 */
export const verifyPayPalPayment = async (req, res) => {
    try {
        const { paypalOrderId } = req.body;

        if (!paypalOrderId) {
            return res.status(400).json({
                success: false,
                message: "paypalOrderId is missing",
            });
        }

        // ✅ find purchase record
        const currentPurchase = await prisma.purchase.findFirst({
            where: { paypalOrderId },
            include: { softwarePlan: true, software: true },
        });

        if (!currentPurchase) {
            return res.status(404).json({
                success: false,
                message: "Purchase record not found",
            });
        }

        // ✅ capture payment from PayPal
        const client = getPayPalClient();
        const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
        request.requestBody({});

        const capture = await client.execute(request);

        const captureId =
            capture?.result?.purchase_units?.[0]?.payments?.captures?.[0]?.id || null;

        const status = capture?.result?.status;

        if (status !== "COMPLETED") {
            await prisma.purchase.update({
                where: { purchase_id: currentPurchase.purchase_id },
                data: { status: "FAILED" },
            });

            return res.status(400).json({
                success: false,
                message: "PayPal payment not completed",
                paypalStatus: status,
            });
        }

        // ✅ generate license keys (same logic as Razorpay)
        let pr = "";
        if (currentPurchase.software.software_id === 1) pr = "ts";
        else if (currentPurchase.software.software_id === 2) pr = "is";
        else pr = "bd";

        const parts = await axios.get(
            `https://actipace.com/091224/api.php?orderid=${paypalOrderId}&product=${pr}&devices=${currentPurchase.softwarePlan.devices}&validity=${
                currentPurchase.softwarePlan.year * 365
            }`
        );

        const ky = parts.data.split("@");
        const codes = ky.slice(1);

        // ✅ email template
        const emailTemplatePath = path.join(__dirname, "../templet/mailtemplet.html");
        const emailTemplate = fs.readFileSync(emailTemplatePath, "utf8");

        let price = Number(currentPurchase.softwarePlan.price);
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

        // ✅ IST expiry logic (same as Razorpay)
        const IST_OFFSET = 5.5 * 60 * 60 * 1000;
        const currentDate = new Date();
        const currentTimeInIST = currentDate.getTime() + IST_OFFSET;

        const purchaseDate = new Date(currentTimeInIST);
        const expirationDate = new Date(currentTimeInIST);
        expirationDate.setFullYear(
            expirationDate.getFullYear() + currentPurchase.softwarePlan.year
        );

        // ✅ update purchase SUCCESS FIRST (important)
        const updated = await prisma.purchase.update({
            where: { purchase_id: currentPurchase.purchase_id },
            data: {
                paypalCaptureId: captureId,
                status: "SUCCESS",
                expiresAt: expirationDate,
                purchase_date: purchaseDate,
            },
        });

        // ✅ send email (but never fail payment if email fails)
        try {
            await mailSender(
                currentPurchase.email,
                "your device licence keys",
                populatedTemplate
            );
        } catch (emailErr) {
            console.log("Error sending email:", emailErr?.message || emailErr);
        }

        return res.status(200).json({
            success: true,
            message: "PayPal payment verified and purchase updated",
            DownloadLink: currentPurchase.software.description,
            expire: expirationDate,
            purchase: updated,
        });
    } catch (err) {
        console.log("PayPal verify/capture error:", err);

        // ✅ mark failed
        try {
            if (req.body.paypalOrderId) {
                await prisma.purchase.update({
                    where: { paypalOrderId: req.body.paypalOrderId },
                    data: { status: "FAILED" },
                });
            }
        } catch (e) {}

        return res.status(500).json({
            success: false,
            message: "PayPal action is not fulfilled",
            error: err.message,
        });
    }
};
