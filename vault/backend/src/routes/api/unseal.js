const express = require('express')
const crypto = require('crypto')

let globals = require('../../configurations/globals')

const router = express.Router()


router.post('/',async function(req,res){
    let msg=""
    try{
        if(req.body.key1!=undefined && globals.key1==null){
            globals.key1 = req.body.key1
            globals.sa = true
            msg="SA team has entered the key"
        }
        if(req.body.key2!=undefined && globals.key2==null){
            globals.key2 = req.body.key2
            globals.db = true
            msg = "DB team has entered the key"
        }
        if(globals.key1!=null && globals.key2!=null){
            let combinedText = globals.key1+globals.key2
            if(combinedText=='harshitjain'){
                globals.unseal = true
                msg="Correct keys"
            }else{
                globals.sa=false, globals.db=false, globals.unseal = false
                globals.key1=null, globals.key2=null
                return res.status(403).json({err:"Keys Mismatch",status:403,unseal:globals.unseal})
            }
        }
        return res.json({msg,unseal:globals.unseal})
    }catch(err){
        console.log(err)
        res.status(503).json({err:"Server error",status:503})
    }
})

router.get('/status',async function(req,res){
    try{
        if(globals.unseal == true){
            return res.json({msg:"Vault Unsealed",status:200,vaultStatus:3})
        }else if(globals.sa==true){
            return res.json({msg:"Vault Partially Unsealed",status:200,vaultStatus:1})
        }else if (globals.db==true){
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