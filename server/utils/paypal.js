import paypal from "@paypal/checkout-server-sdk";

export const getPayPalClient = () => {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error("Missing PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET in .env");
    }

    const environment =
             new paypal.core.SandboxEnvironment(clientId, clientSecret);

    return new paypal.core.PayPalHttpClient(environment);
};
