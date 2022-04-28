//VALIDATION
const Joi = require('@hapi/joi')


//Register Validation
const registerValidation = (data) =>{
    const schema = {
        name: Joi.string().max(20).required(),
        lastName: Joi.string().required().max(20),
        email: Joi.string().max(30).required().lowercase().email(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict()
    }
    return Joi.validate(data, schema)
}

//LoginValidation
const loginValidation = (data) =>{
    const schema = {
        email: Joi.string().min(6).regex(/\S+@\S+\.\S+/).required().lowercase().email(),
        password: Joi.string().min(6).required(),

    }
    return Joi.validate(data, schema)
}

module.exports.registerValidation =  registerValidation   
module.exports.loginValidation = loginValidation