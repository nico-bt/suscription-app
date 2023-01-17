const express = require("express")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Stripe = require("stripe")
const checkAuth = require("../middleware/checkAuth")
const User = require("../models/User")

const stripe = new Stripe(process.env.STRIPE_CLAVE_SECRETA, {
    apiVersion: "2022-11-15"
})

const router = express.Router()

// SIGNUP api/auth/signup
// --------------------------------------------------------------------------------------------
router.post(
    "/signup", 
    body('email').isEmail().withMessage("Invalid Email"), 
    body('password').isLength({ min: 5 }).withMessage("Minimum length of the password is 5"), 
    async (req, res) => {

        const validationErrors = validationResult(req)
        
        if (!validationErrors.isEmpty()) {
            const errors = validationErrors.array().map(item => item.msg)
            return res.status(400).json(errors);
        }
        
        const {email, password} = req.body
        
        try {
            const userAlreadyExist = await User.findOne({email})
            if(userAlreadyExist) {
                return res.status(400).json("User already registered");
            } else {
                const salt = await bcrypt.genSalt()
                const hashedPassword = await bcrypt.hash(password, salt)
                
                // create a Stripe Customer
                const customer = await stripe.customers.create({ email},{apiKey: process.env.STRIPE_CLAVE_SECRETA});

                const newUser = await User.create({
                    email, 
                    password: hashedPassword,
                    customerStripeId: customer.id
                })
                const token = jwt.sign( 
                    { id: newUser._id }, 
                    process.env.JWT_SECRET, 
                    { expiresIn: 5*24*60*60 } 
                )
                return res.status(201).json({
                    id: newUser._id,
                    email: newUser.email,
                    customerStripeId: customer.id, 
                    token
                })
            }
        } catch (error) {
            return res.status(400).json(error);
        }
})

// LOGIN api/auth/login
// --------------------------------------------------------------------------------------------
router.post("/login", async (req, res) => {
        const {email, password} = req.body        
        try {
            const user = await User.findOne({email})

            if(!user) {
                return res.status(400).json("Wrong credentials")
            }
            
            const passwordOk = await bcrypt.compare(password, user.password)
                
            if(passwordOk){
                const token = jwt.sign( 
                    { id: user._id }, 
                    process.env.JWT_SECRET, 
                    { expiresIn: 5*24*60*60 } 
                )
                return res.json({
                    id: user._id,
                    email: user.email, 
                    token
                });
            } else {
                return res.status(400).json("Wrong credentials")
            }
        } catch (error) {
            return res.status(400).json(error);
        }
})

// LOGIN api/auth/me
// --------------------------------------------------------------------------------------------
router.get("/me", checkAuth, async(req, res) => {
    const id = req.user
    try {
        const user = await User.findById(id).select("-password")
        res.json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router