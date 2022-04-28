const mongoose = require('mongoose')


const TransactionSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: [true, 'Please add description'] 
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive or negative number']
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

module.exports = mongoose.model('Transaction', TransactionSchema)