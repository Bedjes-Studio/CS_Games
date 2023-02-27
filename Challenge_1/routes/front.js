const express = require('express');
const router = express.Router();

router.get('/profile', (req, res, next) => {
    res.render('page/profile', {
        isLogged: req.auth.isLogged
    });
});

router.get('/login', (req, res, next) => {

    res.render("page/login", {
        isLogged: req.auth.isLogged
    });
});

router.get('/logout', (req, res, next) => {
    res.clearCookie("AUTH_COOKIE");
    res.redirect('/');
});

router.get('/slots/', (req, res, next) => {
    res.render('page/slots', {
        isLogged: req.auth.isLogged
    });
});

router.get('/slot/manage', (req, res, next) => {
    res.render('page/manage', {
        isLogged: req.auth.isLogged
    });
});

router.get('/slot/:id', (req, res, next) => {
    res.render('page/game', {
        isLogged: req.auth.isLogged
    });
});

router.get('/', (req, res, next) => {
    res.render('page/index', {
        isLogged: req.auth.isLogged
    });
});

router.use('*', (req, res, next) => {
    res.render('page/404', {
        isLogged: req.auth.isLogged
    });
});

module.exports = router;