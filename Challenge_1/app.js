const express = require('express');
var mysql = require('mysql');
const config = require('./config');

const frontRoutes = require('./routes/front');
const apiRoutes = require('./routes/api');

/*
* Setup MySQL
* https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
*/

var con = mysql.createConnection({
    host: config.sql.host,
    user: config.sql.user,
    password: config.sql.password
});

con.connect(function (err) {
    if (err) throw ("Connection to connect to sql server failed :" + err);
    console.log("Connected!");
});

/*
* Setup Express
*/

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');

/*
* Setup routes
*/

app.get('/online', (req, res, next) => {
    res.status(200).json({
        message: 'server is online'
    });
});

app.use('/api', apiRoutes);
app.use('/', frontRoutes);

module.exports = app;