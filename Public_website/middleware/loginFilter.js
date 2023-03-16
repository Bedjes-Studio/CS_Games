module.exports = (req, res, next) => {
    console.log(req.auth.isLogged);
    if (req.auth.isLogged == false) {
        res.redirect("/");
    } else {
        next();
    }
};
