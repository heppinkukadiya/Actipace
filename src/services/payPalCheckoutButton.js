import { PayPalButtons } from "@paypal/react-paypal-js";
import toast from "react-hot-toast";
import { createPayPalOrder, capturePayPalOrder } from "./paypalPayment";

export default function PayPalCheckoutButton({ data, navigate }) {
    return (
        <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={async () => {
                const paypalOrderId = await createPayPalOrder(data);

                if (!paypalOrderId) {
                    toast.error("Unable to create PayPal order");
                    return "";
                }

                return paypalOrderId;
            }}
            onApprove={async (data2) => {
                // data2.orderID is PayPal order id
                await capturePayPalOrder(data2.orderID, navigate);
            }}
            onCancel={() => {
                toast.error("Payment cancelled ❌");
            }}
            onError={(err) => {
                console.log("PayPal Error:", err);
                toast.error("PayPal error ❌");
            }}
        />
    );
}
