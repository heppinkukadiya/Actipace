const { PrismaClient } = require('@prisma/client');
const { mailSender } = require('../utils/mailSender');
const prisma = new PrismaClient();
require("dotenv").config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const axios = require("axios");

//otpsending
exports.otpSender =  async (req,res) =>{

    try{
        //fetch data from frontend
        const{
            email,
            mobileNo
        } = req.body;

        if(!email)
        {
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }

        const user = await prisma.User.findUnique({where:{email}});

        if(user)
        {
            return res.status(401).json({
                success:false,
                message:"User already Registered"
            })
        }

        const user1 = await prisma.User.findUnique({where:{mobileNo}});

        if(user1)
        {
            return res.status(401).json({
                success:false,
                message:"User already Registered"
            })
        }

        const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        await prisma.Otp.upsert({
            where: { email },
            update: { otp, otpExpires },
            create: { email, otp, otpExpires },
        });
        //console.log("otp",otp);
        await axios.post(`https://actipace.com/smsapi/send.php?mobile=${mobileNo}&otp=${otp}`);
        //console.log(resotp.data);

        await mailSender(email,"Your One-Time Password (OTP) for Verification",otp);

        return res.status(200).json({ message: 'OTP sent successfully' });

    }catch(error){
        console.error('Error sending OTP:', error.message);
        return res.status(500).json({ message: 'Error sending OTP' });
    }
}

//signup
exports.signUp = async (req,res) =>{
    try{
        const{
            email,
            password,
            mobileNo,
            address,
            state,
            city,
            country,
            pincode,
            otp
        } = req.body;

        if(!email || !password || !mobileNo || !address || !state || !city || !country || !pincode || !otp)
        {
            return res.status(406).json({
                success:false,
                message:"All fields are required"
            })
        }

        const user = await prisma.Otp.findUnique({where:{email}});

        if (!user) throw new Error('User not found');

        if (user.otp !== otp) throw new Error('Invalid OTP');

        if (new Date() > user.otpExpires) throw new Error('OTP expired');

        const hashpassword = await bcrypt.hash(password,10);

        const User = await prisma.User.create({
            data:{
                email : email,
                password:hashpassword,
                state:state,
                city:city,
                country:country,
                pincode:pincode,
                mobileNo:mobileNo,
                address:address
            }
        })

        await prisma.Otp.update({
            where: { email },
            data: { otp: null, otpExpires: null },
        });

        return res.status(200).json({
            success:true,
            data:User,
            message:"user Registered successfully"
        })


    }catch(error){

        console.log(error.message);
        return res.status(405).json({
            success:false,
            message:error.message
        })
    }
}

//loginOtp
exports.LoginOtp = async (req,res) =>{
    try{
        const {email,password} = req.body;

        if(!email || !password)
        {
            res.status(407).json({
                success:false,
                message:"All fields are required"
            })
        }

        const info =await  prisma.User.findUnique({where:{email}})
        console.log("info",info);

        if(!info)
        {
            return res.status(408).json({
                success:false,
                message:"user not registered"
            })
        }

        if(await bcrypt.compare(password,info.password))
        {
            const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

            const otp = generateOTP();
            const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

            await prisma.Otp.upsert({
                where: { email },
                update: { otp, otpExpires },
                create: { email, otp, otpExpires },
            });


            await axios.post(`https://actipace.com/smsapi/send.php?mobile=${info.mobileNo}&otp=${otp}`);

            await mailSender(email,"Your One-Time Password (OTP) for Verification",otp);

            return res.status(200).json({ message: 'OTP sent successfully' });

        }
        else
        {
            return res.status(401).json({
                success:false,
                message:"password is incorrect"
            })
        }


    }catch(e){

        //console.log("error in sending otp in login",e.message)
        return res.status(502).json({
            success:false,
            message:e.message
        })
    }

}

//Login
exports.Login = async(req,res) =>{
    try{

        const {email,password,otp} = req.body;

        if(!email || !password  || !otp)
        {
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })
        }

        const user = await prisma.otp.findUnique({where:{email}});
        // console.log(user)

        if (!user) throw new Error('User not found');

        if (user.otp !== otp) throw new Error('Invalid OTP');

        if (new Date() > user.otpExpires) throw new Error('OTP expired');

        const info = await prisma.user.findUnique({where:{email}});
        //console.log(info)

        const payload = {
            email:info.email,
            userId:info.user_id
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2d",
        });



        info.token = token;
        info.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true
        }

        return res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            info,
            message:"User logged in successfully"
        })

    }catch(error){
        //console.log(error.message);
        return res.status(402).json({
            success:false,
            message:error.message
        })

    }
}

exports.logout = async(req,res) =>{
    try {
        res.clearCookie("token", {
            httpOnly: true
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    }
    catch (e){
        return res.status(500).json({
            success:false,
            message: "Logout failed"
        })
    }
}