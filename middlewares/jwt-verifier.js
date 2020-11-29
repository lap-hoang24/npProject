const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {

    const token = req.cookies.jwt_token;
    console.log(token);
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
} 