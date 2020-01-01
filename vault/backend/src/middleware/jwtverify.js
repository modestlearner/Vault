const jwt = require('jsonwebtoken')

const jwtsecret = process.env.JWT_SECRET

const verifyToken = function(req,res,next){

    const token = req.header('x-auth-token')
    if(!token){
        return res.status(401).json({err:"Token missing",status:401})
    }
    try{
        const decoded = jwt.verify(token,jwtsecret)
        req.username = decoded.username
        req.email = decoded.email
        next()
    }catch(err){
        console.log(err)
        return res.status(401).json({err:"Token not valid",status:401})
    }
}

module.exports = verifyToken

