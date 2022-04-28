const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        max: 20
    },
    email:{
        type: String,
        required: true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Pleaserovide valid email'
        ],
        unique: true
    },
    // number:{
    //     type: Number,
    //     required: true,
    //     min: 9
    // },
    password:{
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    confirmPassword:{
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    image:{
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    }
})

//userSchema.methods.createJWT = function(){
  //  return jwt.sign({ userId: this._id, name: this.name }, process.env.TOKEN_SECRET, { expiresIn: '30d' })
//}

module.exports = mongoose.model("User", userSchema)