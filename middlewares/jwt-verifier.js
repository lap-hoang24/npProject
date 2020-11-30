const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {
    
    //get token from cookies
    const token = req.cookies.jwt_token; 

    if (token == null) return res.sendStatus(401);
    // verify token 
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        next();
    })
} 