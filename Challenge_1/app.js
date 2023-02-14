const express = require('express');
const ejs = require('ejs');

// const config = require('./config');

// const userRoutes = require('./routes/user');

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');

// TODO : connect SQL here

// app.use('/api/user', userRoutes);

app.use('/online', (req, res, next) => {
    res.status(200).json({
        message: 'server is online'
    });
} );

app.use('/profile', (req, res, next) => {
    res.render('page/profile');
});

app.use('/login', (req, res, next) => {
    res.render('page/login');
});

app.use('/slots/', (req, res, next) => {
    res.render('page/slots');
});

app.use('/slot/manage', (req, res, next) => {
    res.render('page/manage');
});

app.use('/slot/:id', (req, res, next) => {
    res.render('page/game');
});

app.use('/', (req, res, next) => {
    res.render('page/index');
});

app.use('*', (req, res, next) => {
    res.render('page/404');
});

module.exports = app;