const Car = require('../models/car');


const cars = [
    { mileage: 1800, year: 10, name: "Char de Alice", ownerId: "", guestsId: [], specsId: "" },
    { mileage: 5000, year: 10, name: "Char de Bob", ownerId: "", guestsId: [], specsId: "" }
];

exports.carfiller = (createdIds) => {

    specsIds = createdIds[0];
    ownerIds = createdIds[1];

    cars.forEach((car, index) => { car.ownerId = ownerIds[index]; car.specsId = specsIds[index] });

    Car.insertMany(cars).then(
        () => {

            console.log("- Cars created")
            process.exit(0);
        }
    ).catch(
        (error) => {
            console.log("unable to create cars")
            process.exit(1);
        }
    );
};