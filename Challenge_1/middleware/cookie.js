const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
    console.log(req.cookies);
    console.log(req.cookies['AUTH_COOKIE']);

    if (req.cookies['AUTH_COOKIE'] != undefined) {
        let token = req.cookies['AUTH_COOKIE'];
        let decodedToken = jwt.verify(token, config.api.key);
        let username = decodedToken.username;

        req.auth = {
            isLogged: true,
            // TODO : add level for user and admin
            username: username,
        };
    }

    req.auth = {
        isLogged: false,
    };

    next();
};