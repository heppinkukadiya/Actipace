const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.checkplan = async (req,res) =>{
    try{

        const {software_id} = req.body;
        const user_id=req.user.userId

        if(!software_id || !user_id)
        {
            return res.status(401).json({
                success:false,
                message:"field is missing"
            })
        }

        const response = await prisma.purchase.findFirst({
            where:{
                user_id:user_id,
                software_id:software_id,
                status:"SUCCESS"
            },
            orderBy:{
                purchase_date:'desc'
            },
            include:{
                software:true
            }
        })

        if(!response)
        {
            return res.status(200).json({
                success:false,
                message:"no any purchsed plan"
            })
        }

        return res.status(200).json({
                success:true,
                message:"plan is founded",
                response
        })

    }catch(e){
        //console.log("error in check plan",e);
        return res.status(400).json({
            success:false,
            message:"error in checkplan"
        })
    }
}