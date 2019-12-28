const jwt = require('jsonwebtoken')
const config = require('../configurations/config.js')

const jwtsecret = config.dev.jwtSecret

const verifyToken = function(req,res,next){

    const token = req.headers('x-auth-token')
    if(!token){
        return res.status(401).json({err:"Token missing",status:401})
    }
    try{
        const decoded = jwt.verify(token,jwtsecret)
        req.user = decoded.user
        next()
    }catch(err){
        console.log(err)
        return res.status(401).json({err:"Token not valid",status:401})
    }
}

module.exports = verifyToken

