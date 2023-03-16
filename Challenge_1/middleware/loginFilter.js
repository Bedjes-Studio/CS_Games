module.exports = (req, res, next) => {

    if (req.auth.isLogged == false) {
        res.redirect("/");
    }
    else {
        next();
    }
};
