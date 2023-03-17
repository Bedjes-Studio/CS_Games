const { computeChallenges, computeRanking } = require("../controllers/flag");

exports.index = (req, res, next) => {
    computeRanking().then((ranking) => {
        res.render("page/index", {
            isLogged: req.auth.isLogged,
            username: req.auth.username,
            ranking: ranking,
        });
    });
};

exports.challenges = (req, res, next) => {
    if (req.auth.isLogged) {
        computeChallenges(req, res, next).then((results) => {
            res.render("page/challenges", {
                isLogged: req.auth.isLogged,
                username: req.auth.username,
                results: results,
            });
        });
    } else {
        res.redirect("/");
    }
};

exports.notFound = (req, res, next) => {
    res.status(404).render("page/404", {
        isLogged: req.auth.isLogged,
        username: req.auth.username,
        picture: req.auth.picture,
    });
};
