exports.getPublicConfig = async (req, res) => {
    try {
        const allowedKeys = {
            PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || "",
            RAZORPAY_KEY: process.env.RAZORPAY_KEY || "",
            CHAT_APP_KEY: process.env.CHAT_APP_KEY || "",
        };

        const keysParam = req.query.keys;

        if (!keysParam) {
            return res.status(200).json({
                success: true,
                data: allowedKeys,
            });
        }

        const keys = keysParam
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean);

        const data = {};
        keys.forEach((key) => {
            if (allowedKeys[key] !== undefined) {
                data[key] = allowedKeys[key];
            }
        });

        return res.status(200).json({
            success: true,
            data,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to load config",
        });
    }
};
