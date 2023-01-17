const jwt = require("jsonwebtoken")
const User = require("../models/User")
require('dotenv').config()

const checkAuth = async (req, res, next) => {
    let token = req.header("authorization")
    
    if(!token) {
        return res.status(403).json({msg: "Not Authorized"})
    }
    
    // Get rid of "Bearer"
    token = token.split(" ")[1]
    
    try {
        const user = await jwt.verify(token, process.env.JWT_SECRET)
        
        if(!user){
            return res.status(403).json({msg: "Not Authorized"})
        }
        
        // Add the id to the request
        req.user = user.id
        next()
        
    } catch (error) {
        return res.status(403).json({msg: "Not Authorized"})
    }
}

module.exports = checkAuth