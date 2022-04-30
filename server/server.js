require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const postAuth = require('./router/dasboard')
const cors = require('cors')
const app = express()
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
const authRoute = require('./router/ath')
const transaction = require('./router/transaction')
const authTransaction = require('./controller/verifyToken')
const notification = require('./router/message')


//connect to 
const url = process.env.DB_URL
mongoose.connect(`${url}`, {useNewUrlParser: true}, () =>{
    console.log('connected to db')
})

//Middleware


//middleware for extra security
app.set('trust proxy', 1)
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15minutes
  max: 100, // limit each IP to 100requests per windowMs
}))
app.use(helmet())
app.use(xss())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



//Route Middleware
app.use( authRoute)
app.use(postAuth)
app.use( authTransaction, transaction)    //authTransaction,
app.use( authTransaction, notification)
// Handle production
if(process.env.NODE_ENV === 'production'){
    //static folder
    //app.use(express.static(__direname + '/public/'))
    app.use(express.static(__dirname + '../front/public/'))

    //Handler SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '../public/index.html'))
}


const port = process.env.PORT || 3001
app.listen(port, (req,res) =>{
    console.log(`The app is running on http://localhost:${port}`)
})
//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