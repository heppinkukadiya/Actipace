import toast from "react-hot-toast";
import { categories } from "./Api";
import axios from "axios";

// optional: if you want script loading check
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

// STEP 1: Create PayPal order (same like CAPTUREPAYMENT_API)
export async function createPayPalOrder(data) {
    const toastId = toast.loading("loading...");

    try {
        // optional check (PayPal SDK is usually handled by PayPalScriptProvider)
        const res = await loadScript("https://www.paypal.com/sdk/js");
        if (!res) {
            toast.error("PayPal SDK failure");
            toast.dismiss(toastId);
            return null;
        }

        const orderResponse = await axios.post(
            categories.PAYPAL_CREATE_ORDER_API,
            data,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
        );

        if (!orderResponse?.data?.paypalOrderId) {
            toast.error("PayPal order not created");
            toast.dismiss(toastId);
            return null;
        }

        toast.dismiss(toastId);
        return orderResponse.data.paypalOrderId;
    } catch (e) {
        toast.error(e?.response?.data?.message || "PayPal order error");
        toast.dismiss(toastId);
        return null;
    }
}

// STEP 2: Capture PayPal order (same like VERIFYSIGNATURE_API)
export async function capturePayPalOrder(paypalOrderId, navigate) {
    const toastId = toast.loading("loading...");

    try {
        const response = await axios.post(
            categories.PAYPAL_CAPTURE_ORDER_API,
            { paypalOrderId },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
        );

        if (!response?.data) {
            toast.error("PayPal capture failed");
            toast.dismiss(toastId);
            return;
        }

        toast.success("payment Successfull ✅");
        navigate("/login");
    } catch (e) {
        toast.error(e?.response?.data?.message || "PayPal capture error");
    }

    toast.dismiss(toastId);
}
