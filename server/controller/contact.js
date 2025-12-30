const { mailSender } = require("../utils/mailSender")

const formatObjectAsHTMLTable = (obj) => {
    let tableRows = Object.entries(obj)
        .map(([key, value]) => `<tr><td><b>${key}</b></td><td>${value}</td></tr>`)
        .join("");
    return `<table border="1" style="border-collapse: collapse; width: 100%;">
                ${tableRows}
            </table>`;
};

exports.contact = async (req,res) =>{
    try{

        const {email,number,name,comment} = req.body

        if(!email || !number || !name || !comment)
        {
            return res.status(401).json({
                success:false,
                message:"please fill all the fields"
            })
        }

        const data = {
            email,number,name,comment
        }

        const formattedContent = `
        <h3>Object Data</h3>
        ${formatObjectAsHTMLTable(data)}
    `;

        await mailSender(process.env.MAIL_USER,"Customer Contact",formattedContent);

        return res.status(200).json({
            success:true,
            message:"Our team will contact you soon...."
        })
        

    }catch(e){

        console.log(e.message)
        return res.status(400).json({
            success:false,
            message:"error in contact"
        })
    }
}