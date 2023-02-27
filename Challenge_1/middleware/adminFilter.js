const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
    let token = req.auth.token;

    if (req.auth.isLogged == false) {
        res.status(403).json({ "You must be logged to access this.": error });
        if (req.auth.authLevel == 'admin') {
            res.status(403).json({ "You don't have permissions to access this.": error });
        }
    }
    next();
};