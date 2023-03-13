const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db");
const config = require("../config");
const fs = require("fs");
const path = require("path");

// TODO : Hide this request later
exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            date = new Date().toISOString().slice(0, 19).replace("T", " ");
            db.query(
                "INSERT INTO users (username, firstname, lastName, password, balance, email, picture, inscription) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    req.body.username,
                    req.body.firstName,
                    req.body.lastName,
                    hash,
                    0,
                    req.body.email,
                    "default.png",
                    date,
                ],
                function (error, results, fields) {
                    if (error) throw error;

                    res.status(200).json({
                        message: "Account created!",
                    });
                }
            );
        })
        .catch((error) => res.status(500).json({ error: "internal server error" }));
};

exports.login = (req, res, next) => {
    if (req.body.username && req.body.password) {
        db.query("SELECT * FROM users WHERE username = ?", [req.body.username], function (error, results, fields) {
            // If the account exists
            if (results.length > 0) {
                bcrypt
                    .compare(req.body.password, results[0].password)
                    .then((valid) => {
                        if (!valid) {
                            return res.status(401).json({ message: "Mot de passe ou nom d'utilisateur incorrect" });
                        }

                        let token = jwt.sign({ username: req.body.username }, config.server.key, {
                            expiresIn: config.server.tokenDuration,
                        });
                        res.cookie("AUTH_COOKIE", token);
                        res.status(200).json({ token: token });
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json({ error });
                    });
            } else {
                res.status(401).json({ message: "Mot de passe ou nom d'utilisateur incorrect" });
            }
        });
    } else {
        res.status(401).json({ message: "Please enter Username and Password!" });
    }
};

exports.review = (req, res, next) => {
    if (req.body.review) {
        date = new Date().toISOString().slice(0, 19).replace("T", " ");
        db.query(
            "INSERT INTO reviews (username, text, date) VALUES (?, ?, ?)",
            [req.auth.username, req.body.review, date],
            function (error, results, fields) {
                if (error) throw error;

                res.status(200).json({
                    message: "Account created!",
                });
            }
        );
    } else {
        res.status(401).json({ message: "Please enter review!" });
    }
};

// Injection with filename possible, care about destroing server files ?
exports.updatePicture = (req, res, next) => {
    // TODO : add prenium status
    if (req.auth.isLogged) {
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "../public/", req.file.originalname);

        // TODO : add exploit extention
        // TODO : save in db
        console.log();
        if (path.extname(req.file.originalname).toLowerCase() === ".png") {
            fs.rename(tempPath, targetPath, (err) => {
                if (err) {
                    res.status(500).json({ message: err });
                }
                db.query(
                    " UPDATE users SET picture = ? WHERE username = ?",
                    [req.file.originalname, req.auth.username],
                    function (error, results, fields) {
                        if (err) {
                            res.status(500).json({ message: err });
                        }
                        res.status(200).json({ message: "New picture uploaded!" });
                    }
                );
            });
        } else {
            fs.unlink(tempPath, (err) => {
                if (err) {
                    res.status(500).json({ message: err });
                }
                res.status(403).json({ message: "This extension is not allowed." });
            });
        }
    } else {
        res.status(403).json({ message: "You have to be logged first." });
    }
};
