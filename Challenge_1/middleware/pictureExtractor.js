const db = require("../db");

module.exports = (req, res, next) => {
    if (req.auth.isLogged) {
        db.query("SELECT picture FROM users WHERE username = ?", [req.auth.username], (error, results, fields) => {
            req.auth.picture = results[0].picture;
            next();
        });
    } else {
        next();
    }
};
