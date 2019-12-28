const otplib = require('otplib')
const express = require('express')
const router = express.Router()


router.post('/',async function(req,res){
    const secret = 'qwertyuiopasdfghjkl';
    try{
        const isValid = otplib.authenticator.check(req.body.otp, secret);
        if(!isValid){
            return res.status(401).json({err:"Invalid OTP",status:401,valid:false})
        }
        return res.status(200).json({msg:"OTP Valid",status:200,valid:true})
    }catch(err){
        console.log(err)
        return res.status(503).json({err:'Server error',status:503})
    }
})
 
module.exports = router
 
 

