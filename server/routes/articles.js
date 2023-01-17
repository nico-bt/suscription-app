const express = require("express")
const User = require("../models/User")
const checkAuth = require("../middleware/checkAuth")
const Stripe = require("stripe")
const Article = require("../models/Article")

const stripe = new Stripe(process.env.STRIPE_CLAVE_SECRETA, {apiVersion: "2022-11-15"})

const router = express.Router()

router.get("/articles", checkAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user)
        
        const subscriptions = await stripe.subscriptions.list({
            customer: user.customerStripeId
        }, {
            apiKey: process.env.STRIPE_CLAVE_SECRETA
        })
        
        // ver en doc de stripe algo más directo...
        // res.json({sub: subscriptions.data[0].items.data[0].plan.metadata?.name})
        const plan = subscriptions.data[0].items.data[0].plan.metadata.name
        
        if(plan === "Basic") {
            const articles = await Article.find({access: "Basic"})
            return res.json(articles)
        }
        
        if(plan === "Standard") {
            const articles = await Article.find({access: {$in: ["Basic", "Standard"]}})
            return res.json(articles)
            
        }
        if(plan === "Deluxe") {
            const articles = await Article.find({})
            return res.json(articles)
        }
        
    } catch (error) {
        res.json(error)
    }

})

module.exports = router