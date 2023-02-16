const express = require('express');
const ejs = require('ejs');
var mysql = require('mysql');
const config = require('./config');

// https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
// const userRoutes = require('./routes/user');
// app.use('/api/user', userRoutes);

var con = mysql.createConnection({
    host: config.sql.host,
    user: config.sql.user,
    password: config.sql.password
});

con.connect(function (err) {
    if (err) throw("Connection to connect to sql server failed :" + err);
    console.log("Connected!");
});

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');


app.use('/online', (req, res, next) => {
    res.status(200).json({
        message: 'server is online'
    });
});

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