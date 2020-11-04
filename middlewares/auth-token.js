const jwt = require("jsonwebtoken");
// const LocalStorage = require('node-localstorage').LocalStorage;
// localStorage = new LocalStorage('./scratch');
module.exports = function authToken(req, res, next) {

    const token = localStorage.getItem('jwt');

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
} 