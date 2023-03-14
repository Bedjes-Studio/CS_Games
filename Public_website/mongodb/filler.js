const mongoose = require('mongoose');
const config = require('../config');
const { carfiller } = require('./car');
const { specsfiller } = require('./specs');
const { userfiller } = require('./user');
const { dropTables } = require('./utils');


mongoose.connect(config.mongodb.host + ":" + config.mongodb.port + "/" + config.mongodb.name,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB using port " + config.mongodb.port))
    .catch(() => console.log("Connection to MongoDB failed !"));

// TODO : add delete database option
dropTables()
    .then(() => {
        Promise.all([specsfiller(), userfiller()])
            .then((createdIds) => {
                carfiller(createdIds);
                // TODO : add event creation based on cars
            });
    });

// insert cars


