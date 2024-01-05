const jwt = require('jsonwebtoken')
const TOKEN_KEY = require('../pw.js')
// Middleware for handling auth
function adminMiddleware (req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    
    const token = req.headers.authorization.split(" ")[1];
    try {
        const data = jwt.verify(token,TOKEN_KEY);
        req.username = data.username
        next();
    } catch (error) {
        res.status(401).json({
            msg: "authentication failed"
        })
    }
}

module.exports = adminMiddleware;