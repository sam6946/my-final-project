const router = require('express').Router()
const User = require('../model/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../model/validationSchema')
const block = require('../controller/verifyToken')



router.post('/api/register', async (req,res) => {

    //LETS VALIDATE THE DATA BEFORE WE ADD THE USER
    const { error, validation } = registerValidation(req.body)
    if(error) return res.status(400).json({ errors: error.details[0].message})

    //Cheking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).json({  errr:'Email already exists'})

    //Hash passwords
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const hashedConfirmPassword = await bcrypt.hash(req.body.confirmPassword, salt)

    //Create a new user
    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        number: req.body.number,
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword,
        date: req.body.date,
    }) 
    try{
        const savedUser = await user.save();
        const token = jwt.sign({userId: user._id, name: user.name}, process.env.TOKEN_SECRET, { expiresIn: '30d' })
        return res.header('authorization', token).json({ user: { name: user.name }, token  } )
    }catch(error){
       return res.status(400).json({error})
    }
})

router.post('/api/login', async (req,res) =>{
    const { error, validation } = loginValidation(req.body)
    if(error) return res.status(400).send({ errors: error.details[0].message })
    //Check if the user exists in the database
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).json({errors: 'Email is not found'})
    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).json({ errors: 'Invalid password' })

    const token = jwt.sign({userId: user._id, name: user.name}, process.env.TOKEN_SECRET, { expiresIn: '30d' })
    res.header('authorization', token).json({ user: { name: user.name }, token  } ) 

    //res.send('Logged in')
})

//Profile
router.get('/api/dashboard', (req, res) =>{
    const luckyNumber = Math.floor(Math.random() * 100)

  res.status(200).json({
    msg: `Hello, ${req.user.name}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })
})


router.patch('/api/upload/:id', async (req, res) => {
    try {
        const id = req.params.id
        const options= { new: true }
        const found = await User.findByIdAndUpdate(id, updates, options)
        if(found){
            const updates = req.body
        }
        res.json({ res: result })

    } catch (error) {
        res.json({message: error.message})
    }
})



module.exports = router