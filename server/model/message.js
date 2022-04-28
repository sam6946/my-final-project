const mongoose = require('mongoose')


const MessageSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: [true, 'Please Enter your Email'] 
    },
    minute: {
        type: Number,
        required: [true, 'Please add a positive or negative number']
    },
    hours: {
        type: Number,
        required: [true, 'Please entre a valuer']
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: [true, 'please provide user']
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Message', MessageSchema)