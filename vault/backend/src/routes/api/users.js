const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('../../configurations/config')
const bcrypt = require('bcrypt')

const UserDoc = require('../../models/UsersDoc')
const jwtVerify = require('../../middleware/jwtverify')

router.post('/signup',async function(req,res){

    const {name,email,password} = req.body

    try{
        const user = await UserDoc.findOne({email})
        if (user){
            return res.status(403).json({err:"User already exists",status:403})
        }

        user = new UserDoc({
            name,
            email,
            password
        })
        const salt = bcrypt.genSalt(10)
        user.password = bcrypt.hash(password,salt)
        await user.save()

        const payload = {
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,config.dev.jwtSecret,{expiresIn:'7d'},function(err,token){
            if(err){
                throw err
            }
            return res.json({token:token})
        })

    }catch(err){
        console.log(err)
        return res.status(503).json({err:"Server error",status:503})

    }
})

router.post('/signin',async function(req,res){

    const {email,password} = req.body

    try{
        const user = await UserDoc.findOne({email})
        if(!user){
            return res.status(403).json({err:"No user found",status:403})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(403).json({err:"Invalid Credentials",status:403})
        }
        const payload = {
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,config.dev.jwtSecret,{expiresIn:'7d'},function(err,token){
            if(err){
                throw err
            }
            return res.json({token:token})
        })
    }catch(err){
        console.log(err)
        res.status(503).json({err:"Server error",status:503})
    }
})

router.post('/signin/demo',vaultStatus,async function(req,res){
    const {username,email,phone} = req.body

    try{
        const payload = {
            username,
            email
        }
        jwt.sign(payload,config.dev.jwtSecret,{expiresIn:'7d'},function(err,token){
            if(err){
                throw err
            }
            return res.json({token:token})
        })
    }catch(err){
        console.log(err)
        res.status(503).json({err:"Server error",status:503})
    }


})

module.exports = router