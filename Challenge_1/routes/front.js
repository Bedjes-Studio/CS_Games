const express = require('express');
const router = express.Router();

router.get('/profile', (req, res, next) => {
    res.render('page/profile');
});

router.get('/login', (req, res, next) => {
    res.render('page/login');
});

router.get('/slots/', (req, res, next) => {
    res.render('page/slots');
});

router.get('/slot/manage', (req, res, next) => {
    res.render('page/manage');
});

router.get('/slot/:id', (req, res, next) => {
    res.render('page/game');
});

router.get('/', (req, res, next) => {
    res.render('page/index');
});

router.use('*', (req, res, next) => {
    res.render('page/404');
});

module.exports = router;