const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
    if (req.cookies["AUTH_COOKIE"] != undefined) {
        try {
            let token = req.cookies["AUTH_COOKIE"];
            let decodedToken = jwt.verify(token, config.server.key);
            let username = decodedToken.username;
            let isAdmin = false;
            if (username == "Admin") {
                isAdmin = true;
            }

            req.auth = {
                isLogged: true,
                username: username,
                isAdmin: isAdmin
            };
            next();
        } catch (error) {
            if (error.name == "TokenExpiredError") {
                res.clearCookie("AUTH_COOKIE");
            }
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
