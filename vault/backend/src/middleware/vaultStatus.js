const globals = require('../configurations/globals')
const vaultStatus = function(req,res,next){
    if(!globals.unseal){
        return res.status(401).json({err:"Vault Sealed",status:401})
    }
    next()
}

module.exports = vaultStatus