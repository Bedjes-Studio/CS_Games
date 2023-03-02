const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const db = require("../db")
const config = require("../config")

// TODO : Hide this request later
exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            db.query(
                "INSERT INTO user (username, password, email) VALUES (?, ?, ?)",
                [req.body.username, hash, req.body.email],
                function (error, results, fields) {
                    if (error) throw error
                    console.log(results)

                    res.status(200).json({
                        message: "Account created!",
                    })
                }
            )
        })
        .catch((error) => res.status(500).json({ error: "internal server error" }))
}

exports.login = (req, res, next) => {
    if (req.body.username && req.body.password) {
        db.query("SELECT * FROM user WHERE username = ?", [req.body.username], function (error, results, fields) {
            // If the account exists
            if (results.length > 0) {
                bcrypt
                    .compare(req.body.password, results[0].password)
                    .then((valid) => {
                        if (!valid) {
                            return res.status(401).json({ message: "Incorrect Username and/or Password!" })
                        }

                        let token = jwt.sign({ username: req.body.username }, config.server.key, {
                            expiresIn: config.server.tokenDuration,
                        })
                        res.cookie("AUTH_COOKIE", token)
                        res.status(200).json({ token: token })
                    })
                    .catch((error) => {
                        console.log(error)
                        res.status(500).json({ error })
                    })
            } else {
                res.status(401).json({ message: "Incorrect Username and/or Password!" })
            }
        })
    } else {
        res.status(401).json({ message: "Please enter Username and Password!" })
    }
}

exports.review = (req, res, next) => {
    if (req.body.review) {
        date = new Date().toISOString().slice(0, 19).replace("T", " ")
        console.log(date)
        db.query(
            "INSERT INTO reviews (creator, text, date) VALUES (?, ?, ?)",
            [req.auth.username, req.body.review, date],
            function (error, results, fields) {
                if (error) throw error

                res.status(200).json({
                    message: "Account created!",
                })
            }
        )
    } else {
        res.status(401).json({ message: "Please enter review!" })
    }
}

const fs = require("fs")
const path = require("path")

//https://stackoverflow.com/questions/15772394/how-to-upload-display-and-save-images-using-node-js-and-express
exports.updatePicture = (req, res, next) => {
    if (req.body.review) {
        date = new Date().toISOString().slice(0, 19).replace("T", " ")
        console.log(date)
        db.query(
            "INSERT INTO reviews (creator, text, date) VALUES (?, ?, ?)",
            [req.auth.username, req.body.review, date],
            function (error, results, fields) {
                if (error) throw error

                res.status(200).json({
                    message: "Account created!",
                })
            }
        )
    } else {
        res.status(401).json({ message: "Please enter review!" })
    }
}
