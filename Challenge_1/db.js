const mysql = require('mysql');
const config = require('./config');

/*
* Setup MySQL
* https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
*/
const mysqlConnection = mysql.createConnection({
    host: config.sql.host,
    user: config.sql.user,
    password: config.sql.password,
    database: config.sql.database
});

mysqlConnection.connect(function (err) {
    if (err) throw ("Connection to connect to sql server failed :" + err);
    console.log("Connected!");
});


module.exports = mysqlConnection;
