const express = require('express')
const crypto = require('crypto')

const router = express.Router()

let key1 = null, key2 = null 
let sa = false, db = false, unseal = false

router.post('/',async function(req,res){
    let msg=""
    try{
        if(req.body.key1!=undefined && key1==null){
            key1 = req.body.key1
            sa = true
            msg="SA team has entered the key"
        }
        if(req.body.key2!=undefined && key2==null){
            key2 = req.body.key2
            db = true
            msg = "DB team has entered the key"
        }
        if(key1!=null && key2!=null){
            let combinedText = key1+key2
            console.log(combinedText)
            if(combinedText=='harshitjain'){
                unseal = true
                msg="Correct keys"
            }else{
                sa=false, db=false, unseal = false
                key1=null, key2=null
                return res.status(403).json({err:"Keys Mismatch",status:403,unseal})
            }
        }
        return res.json({msg,unseal})
    }catch(err){
        console.log(err)
        res.status(503).json({err:"Server error",status:503})
    }
})

router.get('/status',async function(req,res){
    try{
        if(unseal == true){
            return res.json({msg:"Vault Unsealed",status:200,vaultStatus:3})
        }else if(sa==true){
            return res.json({msg:"Vault Partially Unsealed",status:200,vaultStatus:1})
        }else if (db==true){
            return res.json({msg:"Vault Partially Unsealed",status:200,vaultStatus:2})
        }else{
            return res.json({msg:"Vault Sealed",status:200,vaultStatus:0})
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({err:"Server error",status:500})
    }
})

module.exports = router