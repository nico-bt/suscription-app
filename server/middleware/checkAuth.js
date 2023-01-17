const checkAuth = (req, res, next) => {
    console.log("Checking auth...")
    next()
}

module.exports = checkAuth