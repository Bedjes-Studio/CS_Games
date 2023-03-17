const { computeRanking } = require("../controllers/flag");

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
        // db.query("SELECT * FROM users WHERE username = ?", [req.auth.username], function (error, results, fields) {
        //     req.auth.firstName = results[0].firstName;
        //     req.auth.lastName = results[0].lastName;
        //     req.auth.email = results[0].email;
        //     req.auth.inscription = results[0].inscription;
        //     if (!req.auth.isAdmin) {
        //         displayClientProfile(req, res);
        //     } else {
        //         displayAdminProfile(req, res);
        //     }
        // });

        res.render("page/challenges", {
            isLogged: req.auth.isLogged,
            username: req.auth.username,
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
