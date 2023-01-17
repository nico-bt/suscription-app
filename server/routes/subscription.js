const express = require("express")
const User = require("../models/User")
const checkAuth = require("../middleware/checkAuth")
const Stripe = require("stripe")

const stripe = new Stripe(process.env.STRIPE_CLAVE_SECRETA, {apiVersion: "2022-11-15"})

const router = express.Router()

// Base route api/subs
// -------------------------------------------------------------
router.get("/prices", checkAuth, async (req,res) => {
    const prices = await stripe.prices.list({ 
        apiKey: process.env.STRIPE_CLAVE_SECRETA 
    })
    res.json({prices})
})

router.post("/session", checkAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
      
        const session = await stripe.checkout.sessions.create(
            {
                mode: "subscription",
                payment_method_types: ["card"],
                line_items: [{ price: req.body.priceId, quantity: 1 },],
                success_url: "http://localhost:3000/articles",
                cancel_url: "http://localhost:3000/articles-plan",
                customer: user.customerStripeId
            },
            {
                apiKey: process.env.STRIPE_CLAVE_SECRETA,
            }
        );

        return res.json(session);

    } catch (error) {
        res.json(error)
    }
});

module.exports = router