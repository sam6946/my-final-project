const express = require('express')
const router = express.Router()
const authentification = require('../controller/verifyToken')
//const checkUserValid = require('../middleware/authMiddleware')



router.get('/api/dashboard', authentification, (req, res) => {
    res.json( req.user)
})

module.exports= router