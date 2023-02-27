const express = require('express');

const frontRoutes = require('./routes/front');
const apiRoutes = require('./routes/api');

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