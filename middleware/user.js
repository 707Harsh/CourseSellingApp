// Middleware for handling user authentication

const jwt = require('jsonwebtoken')
const {secKey} = require('../config');
function userMiddleware(req, res, next) {

    // Implementing user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    const auth  = req.headers.authorization;
    if(!(auth.startsWith("Bearer ")))
    {
        res.json({
            msg: "Sorry! pls signup to continue"
        })
    }
    const token = auth.slice(7);
    try
    {
        const decodedValue = jwt.verify(token,secKey);
        if(decodedValue)
        {
            req.username = decodedValue;
            next();
        }
        else
        {
            res.json({
                msg: "You are not authenticated, pls signup to continue"
            })
        }
    }
    catch(e)
    {
        res.json({
            msg: "You are not authenticated, pls signup to continue"
        })
    }
}

module.exports = userMiddleware;