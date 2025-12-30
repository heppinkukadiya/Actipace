const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.getplan =async (req,res) =>{
    try{
        const{device,year,id} = req.body
        
        const amount = await prisma.softwarePlan.findFirst({where:{devices:Number(device),year:Number(year),software_id:id}})
        //console.log(amount);

        return res.status(200).json({
            success:true,
            message:"amount is sent",
            amount
        })

    }catch(e){
        //console.log(e);
        return res.status(500).json({
            success:false,
            message:"error in amount sending",
            message1:e.message
        })

    }

}