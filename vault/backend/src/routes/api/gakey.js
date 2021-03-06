const otplib = require('otplib')
const express = require('express')
const router = express.Router()

const jwtVerify = require('../../middleware/jwtverify')
const vaultStatus = require('../../middleware/vaultStatus')



router.post('/',[jwtVerify,vaultStatus],async function(req,res){
    try{
        const isValid = otplib.authenticator.check(req.body.otp, process.env.GA_SECRET);
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
 
 

