
exports.index = (req, res, next) => {
    // db.query("SELECT position FROM slots", function (error, results, fields) {
    //     slot_id = results[Math.floor(Math.random() * results.length)].position;
    //     db.query("SELECT * FROM reviews", function (error, results, fields) {
    //         res.render("page/index", {
    //             isLogged: req.auth.isLogged,
    //             username: req.auth.username,
    //             picture: req.auth.picture,
    //             slot_id: slot_id,
    //             reviews: results.slice(Math.max(results.length - 3, 1)),
    //         });
    //     });
    // });
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
