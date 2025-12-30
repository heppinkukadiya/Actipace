const { mailSender } = require("../utils/mailSender")

const formatObjectAsHTMLTable = (obj) => {
    let tableRows = Object.entries(obj)
        .map(([key, value]) => `<tr><td><b>${key}</b></td><td>${value}</td></tr>`)
        .join("");
    return `<table border="1" style="border-collapse: collapse; width: 100%;">
                ${tableRows}
            </table>`;
};

exports.support = async (req,res) =>{
    try{

        const {firstName,lastName,email,number,message} = req.body

        if(!firstName || !lastName || !email || !number || !message)
        {
            return res.status(402).json({
                success:false,
                message:"all fields are required"
            })
        }

        const data = {
            firstName,
            lastName,
            email,
            number,
            message
        }

        const formattedContent = `
        <h3>Object Data</h3>
        ${formatObjectAsHTMLTable(data)}
    `;

        await mailSender(process.env.MAIL_USER,"Customer Support",formattedContent);

        return res.status(200).json({
            success:true,
            message:"Our team will contact you soon...."
        })

    }catch(e){
        console.log(e.message);
        return res.status(501).json({
            success:false,
            message:"error in support"
        })
    }
}