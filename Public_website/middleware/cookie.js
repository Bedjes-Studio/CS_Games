const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
    if (req.cookies["AUTH_COOKIE"] != undefined) {
        try {
            let token = req.cookies["AUTH_COOKIE"];
            let decodedToken = jwt.verify(token, config.server.key);
            let username = decodedToken.username;

            req.auth = {
                isLogged: true,
                username: username,
            };
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({ "auth error": error });
        }
    } else {
        req.auth = {
            isLogged: false,
        };
        next();
    }
};
