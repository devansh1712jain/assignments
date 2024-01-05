const jwt = require('jsonwebtoken')
const TOKEN_KEY = require('../pw.js')
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    try {
        const token = req.headers.authorization.split(" ")[1];
        const ans = jwt.verify(token,TOKEN_KEY);
        req.username = ans.username;

        next();
    } catch (error) {
        res.status(400).json({
            msg:"authorization failed"
        })
    }
}

module.exports = userMiddleware;