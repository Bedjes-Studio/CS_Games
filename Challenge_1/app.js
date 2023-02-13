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

app.use('/', (req, res, next) => {
    res.render('page/home');
} );



module.exports = app;