const Specs = require('../models/specs');
const { extractIds } = require('./utils');

const specs = [
    { brand: "Chrysler", model: "300", trim: "Touring", fuelType: "Essence", fuelCapacity: 58 },
    { brand: "Chrysler", model: "200", trim: "Touring", fuelType: "Essence", fuelCapacity: 58 },
];

exports.specsfiller = () => {

    return Specs.insertMany(specs).then(
        (data) => {
            console.log("- Specs created");
            return (extractIds(data));
        }
    ).catch(
        (error) => {
            console.log("unable to create specs");
            process.exit(1);
        }
    );
};