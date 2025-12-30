const { PrismaClient } = require('@prisma/client');
const { mailSender } = require('../utils/mailSender');
const prisma = new PrismaClient();
const bcrypt = require("bcrypt")
const crypto = require("crypto")
require("dotenv").config();

//resetpassword token
exports.resetPasswordToken = async(req,res) =>{
    try{

        const {email} = req.body
        console.log(email)

        const User = await prisma.user.findUnique({where:{email}});
        console.log(User)

        if(!User){
            return res.status(401).json({
                success:false,
                message:"your email is not registered with us"
            })
        }

        const token = crypto.randomUUID();

        const upadteDetail = await prisma.user.update({
                                    where:{email},
                                    data:{
                                        token:token,
                                        resetPasswordExpires:new Date(Date.now() + 10 * 60 * 1000),
                                        }
                                })
        
        const url = `https://actipace.com/newpassword/${token}`;

        await mailSender(email,"Password Reset Link",`Password Reset Link: ${url}`)

        return res.status(200).json({
            success:true,
            message:"email sent successfully,please check email and change password"
        })

    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            message:"something went wrong while sending mail for pwd reset"
        })
    }
}

//reset password
exports.resetPassword = async(req,res) =>{
    try{

        const {password,confirmPassword,token} = req.body

        if(password === confirmPassword){
            return res.status(401).json({
                success:false,
                message:"password not matching"
            })
        }

        const userDetail = await prisma.user.findUnique({where:{token}});

        if(!userDetail){
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            })
        }

        if(userDetail.resetPasswordExpires < Date.now()){
            return res.status(401).json({
                success:false,
                message:"token is expired"
            })
        }

        const saltRounds = 10;
        const hashpassword = await bcrypt.hash(password, saltRounds);

        await prisma.user.update({
            where:{token:token},
            data:{password:hashpassword}
        })

        return res.status(200).json({
            success:true,
            message:"reset password successfully"
        })

    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            message:"something went wrong while reseting password"
        })

    }
}