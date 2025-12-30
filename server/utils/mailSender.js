const { SendMailClient } = require("zeptomail");
require("dotenv").config();

const mailSender = async (email, title, body) => {
    try {

        const client = new SendMailClient({
            url: process.env.ZEPTOMAIL_URL,
            token: process.env.ZEPTOMAIL_API_KEY
        });


        let response = await client.sendMail({
            from: {
                address: process.env.MAIL_FROM,
                name: "Actipace",
            },
            to: [
                {
                    email_address: {
                        address: email
                    },
                },
            ],
            subject: title,
            htmlbody: body,
        });
        return response;
    } catch (e) {
        console.error("Error sending email:", e.message);
        throw e;
    }
};

module.exports = { mailSender };
