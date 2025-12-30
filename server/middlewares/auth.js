const jwt = require("jsonwebtoken")
require("dotenv").config();

//auth
exports.auth = async (req,res,next) =>{
    try{

        //console.log(req.body);
        const authHeader = req.header('Authorization');
        //console.log(authHeader);
        if(!authHeader)
        {
            return res.status(401).json({
                success:false,
                message:"token is missing"
            })
        }
        const token = authHeader.split(' ')[1]; // Extract token

        try{

            const decode = jwt.verify(token,process.env.JWT_SECRET);
            //console.log(decode);
            req.user = decode;

        }catch(e){
            return res.status(401).json({
                success:false,
                message:"Please LogIn......  First"
            })
        }
        next();

    }catch(e){
        //console.log(e.message)
        return res.status(401).json({
            success:false,
            message:"error in auth middleware"
        })

    }
}