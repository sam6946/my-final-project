const router = require('express').Router()
let CronJob = require('cron').CronJob;
const MessageModel = require('../model/message')
const nodemailer = require('nodemailer');




const coordonne = async (req, res, next) => {
    try {
        req.body.createdBy = req.user.userId
        const { email, minute, hours } = req.body
        const message = await MessageModel.create(req.body)
        console.log(message)
        // Email message options
        const mailOption = {
        from: "samtaka5642@gmail.com",
        to: message.email,
        subject: "Notification About Track Daily",
        text: "Today is another day please can and your money"
      }

        //email transport configuration
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
           user: "samtaka5642@gmail.com",
           pass: 'samtaka12'
        }
     })
    
     //configuration of hours 
     let d = new Date()
      req.body.minute = d.getMinutes()
      req.body.hours = d.getHours()
    //   if(req.body.minute < 9){
    //     req.body.minute = "0" + req.body.minute
    //     req.body.heure = "0" + req.body.minute
    //   }else{
    //     req.body.minute =  req.body.minute
    //     req.body.heure =  req.body.minute
    //   }
     console.log(d +1)
       //sned email
       let job = new CronJob(`   ${req.body.minute + 1} ${req.body.hours } * * *`, function() {
         transporter.sendMail(mailOption, (error, info) => {
            if(error){ 
               console.log(error)
             }else{
                console.log('Email send: ' + info.response)
             }
          })
       }, null, true, 'Africa/Douala');
        job.start();
        console.log(job)


        return res.status(201).json({
            success: true,
            data: message
        })
    } catch (err) {
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message)
            return res.status(400).json({
                success: false,
                error: messages
            })
        }else{
            return res.status(500).json({
                success: false,
                error: 'Server Errorrrrrr'
            })
        }
    }
}

router.post('/api/notification', coordonne)





// router.post("/notification", async(req, res) =>{
//     try {

//         let d = new Date()
//         let min = d.getMinutes()
//         let date = d.getDate()
//         let month = d.getMonth()
//         let hour = d.getHours()

//         let job = new CronJob(` ${ min +1 } ${ hour } ${ date } ${ month +1 } *`, function() {
//             console.log(`task completed at ${hour} : ${min + 1}`);
//           }, null, true, 'Africa/Douala');
//           job.start();
        
//     } catch (error) {
//         res.json({ error: "Server error"})
//     }
// })


//exportation de notre router
module.exports = router
