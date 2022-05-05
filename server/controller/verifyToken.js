const jwt = require('jsonwebtoken')

module.exports = async function(req, res, next ){
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({ errors: 'Authentication invalid' })
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.TOKEN_SECRET)
    
        req.user = { userId:payload.userId, name:payload.name }
        next()
    } catch (error) {
        return res.status(401).json({ errors: 'Access Denied invalid token' })
    }






    
}