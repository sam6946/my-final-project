
const jwt = require('jsonwebtoken')
//const token = req.header('auth-token')
const User = require('../model/User')





const checkUser = (req, res, next) => {
    const token = req.header('auth-token')

    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if(err){
                console.log(err)
                res.locals.user = null
                next()
            }else{
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    }
    else{
        res.locals.user = null
        next()
    }
}

module.exports = checkUser