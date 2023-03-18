const { query } = require("express");
const db = require("./db");

const configValues = [
    [0, "admin", "bob"],
    [1, "slots_config", "/slots_config.conf"],
    [2, "serial_number_derivation", "SHA256"],
];

const userValues = [
    [
        0,
        "ALC",
        "Alice",
        "Larue",
        "$10$R40b7j5iUfTqHu7fuT9Jlu8RB.o2Egnnmzpbhv5RMIW1oZ2m3R6Qa",
        "150",
        "alice@gmail.com",
        "default.png",
        "2019-03-13 20:13:20",
    ],
    [
        1,
        "Admin",
        "Frank",
        "Catton",
        "$10$d3ZAH0g2SNmGDzcdno2slO7CtmNV1CyZgI8IkZzQiZ/aHM2RejxUK",
        "1",
        "frank@gmail.com",
        "default.png",
        "2019-03-13 20:13:20",
    ],
    [
        2,
        "Sebia",
        "Bob",
        "Cinnor",
        "$10$d3ZAH0g7SNmGDzcdno2siO7CtmNV1CyZg48IkZzQiZ/aHM2RejxUK",
        "1000456048",
        "bob@gmail.com",
        "default.png",
        "2019-03-13 20:13:20",
    ],
    [
        3,
        "Maestro",
        "Charlie",
        "Vilvao",
        "$10$d3ZAH0g7SNmGDzcdno2siO7CtmNV1CyZg48IkZzQiZ/aHM2RejxUK",
        "26495315",
        "charlie@gmail.com",
        "default.png",
        "2019-03-13 20:13:20",
    ],
    [
        4,
        "Monica",
        "Monica",
        "Balasta",
        "$10$d3ZAH0g7SNmGDzcdno2siO7CtmNV1CyZg48IkZzQiZ/aHM2RejxUK",
        "1286243",
        "monica@gmail.com",
        "default.png",
        "2019-03-13 20:13:20",
    ],
];

const reviewsValues = [
    [0, "Sebia", "Un casino vraiment exeptionnel !", "2023-03-17 20:13:20"],
    [0, "Sebia", "Un casino vraiment exeptionnel !", "2023-03-17 20:13:20"],
    [1, "Maestro", "J'ai gagné le gros lot et j'ai changé de vie.", "2023-03-15 20:13:20"],
    [2, "Monica", "Avec mes amis, on jouons souvent ici, c'est pas mal fun", "2023-02-01 20:13:20"],
];

const shiftsValues = [
    [0, "Admin", "Dealer", "12", "Lundi", "8h-16h"],
    [1, "Admin", "Dealer", "12", "Mardi", "8h-16h"],
    [2, "Admin", "Dealer", "12", "Mercredi", "8h-16h"],
    [3, "Admin", "Dealer", "12", "Jeudi", "8h-16h"],

    [4, "Admin", "Dealer", "13", "Lundi", "8h-16h"],
    [5, "Admin", "Dealer", "13", "Mardi", "8h-16h"],
    [6, "Admin", "Dealer", "13", "Mercredi", "8h-16h"],
    [7, "Admin", "Dealer", "13", "Jeudi", "8h-16h"],

    [8, "Admin", "Dealer", "14", "Lundi", "8h-16h"],
    [9, "Admin", "Dealer", "14", "Mardi", "8h-16h"],
    [10, "Admin", "Dealer", "14", "Mercredi", "8h-16h"],
    [11, "Admin", "Dealer", "14", "Jeudi", "8h-16h"],

    [0, "Admin", "Dealer", "15", "Lundi", "8h-16h"],
    [1, "Admin", "Dealer", "15", "Mardi", "8h-16h"],
    [2, "Admin", "Dealer", "15", "Mercredi", "8h-16h"],
    [2, "Admin", "Dealer", "15", "Jeudi", "8h-16h"],
];

const slotsValues = [
    [0, "534961892", 5164],
    [1, "567667770", 14374],
    [2, "991703939", 839],
    [3, "235111990", 12235],
    [4, "397672979", 17449],
    [5, "119433", 3402],
    [6, "679777275", 25456],
    [7, "741493235", 9910],
    [8, "6497542625", 4388],
    [9, "512792077", 15474],
    [10, "686539965", 9084],
    [11, "759673111", 10776],
    [12, "179406197", 12032],
    [13, "597499546", 10574],
    [14, "693574431", 19972],
];

// slots (
//     slot_id int,
//     position CHAR(60),
//     balance int
// );`;

function rebuildDB() {
    return new Promise(function (resolve, reject) {
        db.query("DROP DATABASE ctf1", (error) => {
            if (error) reject(error);
            console.log("Database dropped Successfully");

            db.query("CREATE DATABASE ctf1", (error) => {
                if (error) reject(error);
                console.log("Database Created Successfully");

                db.query("USE ctf1", (error) => {
                    if (error) reject(error);
                    console.log("Using Database");
                    resolve();
                });
            });
        });
    });
}

function createUserTable() {
    return new Promise(function (resolve, reject) {
        let createQuery = "CREATE TABLE ";
        let colums = `users (
                    userId int,
                    username VARCHAR(45),
                    firstName VARCHAR(45), 
                    lastName VARCHAR(45),
                    password CHAR(60),
                    balance INT,    
                    email VARCHAR(45),    
                    picture VARCHAR(45),    
                    inscription DATETIME    
                );`;

        db.query(createQuery + colums, (error) => {
            if (error) reject(error);
            console.log("Table users created");
            resolve();
        });
    });
}

function createSlotsTable() {
    return new Promise(function (resolve, reject) {
        let createQuery = "CREATE TABLE ";
        let colums = `slots (
                    slot_id int,
                    position CHAR(60),
                    balance int
                );`;

        db.query(createQuery + colums, (error) => {
            if (error) reject(error);
            console.log("Table slots created");
            resolve();
        });
    });
}

function createShiftsTable() {
    return new Promise(function (resolve, reject) {
        let createQuery = "CREATE TABLE ";
        let colums = `shifts (
                    shift_id int,
                    username VARCHAR(45),
                    job VARCHAR(45),
                    week VARCHAR(45),
                    day VARCHAR(45),
                    hours VARCHAR(45)
                );`;

        db.query(createQuery + colums, (error) => {
            if (error) reject(error);
            console.log("Table shifts created");
            resolve();
        });
    });
}

function createReviewsTable() {
    return new Promise(function (resolve, reject) {
        let createQuery = "CREATE TABLE ";
        let colums = `reviews (
                    review_id int,
                    username VARCHAR(45),
                    text VARCHAR(1000),
                    date DATETIME
                );`;

        db.query(createQuery + colums, (error) => {
            if (error) reject(error);
            console.log("Table review created");
            resolve();
        });
    });
}

function createConfigTable() {
    return new Promise(function (resolve, reject) {
        let createQuery = "CREATE TABLE ";
        let colums = `config (
                    config_id int,
                    attribute VARCHAR(45),
                    value VARCHAR(45)
                );`;

        db.query(createQuery + colums, (error) => {
            if (error) reject(error);
            console.log("Table config created");
            resolve();
        });
    });
}

function fillUserTable() {
    return new Promise(function (resolve, reject) {
        let createQuery = "INSERT INTO ";
        let colums = `users (
            userId ,
            username ,
            firstName , 
            lastName ,
            password ,
            balance ,    
            email ,    
            picture ,    
            inscription     
        )`;

        db.query(createQuery + colums + " VALUES ?", [userValues], (error) => {
            if (error) reject(error);
            console.log("Content user created");
            resolve();
        });
    });
}

function fillSlotsTable() {
    return new Promise(function (resolve, reject) {
        let createQuery = "INSERT INTO ";
        let colums = `slots (
            slot_id ,
            position ,
            balance 
        )`;

        db.query(createQuery + colums + " VALUES ?", [slotsValues], (error) => {
            if (error) reject(error);
            console.log("Content slots created");
            resolve();
        });
    });
}

function fillReviewTable() {
    return new Promise(function (resolve, reject) {
        let createQuery = "INSERT INTO ";
        let colums = `reviews (
            review_id ,
            username ,
            text ,
            date 
        )`;

        db.query(createQuery + colums + " VALUES ?", [reviewsValues], (error) => {
            if (error) reject(error);
            console.log("Content review created");
            resolve();
        });
    });
}

function fillShiftTable() {
    return new Promise(function (resolve, reject) {
        let createQuery = "INSERT INTO ";
        let colums = `shifts (
            shift_id ,
            username ,
            job ,
            week ,
            day ,
            hours 
        )`;

        db.query(createQuery + colums + " VALUES ?", [shiftsValues], (error) => {
            if (error) reject(error);
            console.log("Content shift created");
            resolve();
        });
    });
}

function fillConfigTable() {
    return new Promise(function (resolve, reject) {
        let createQuery = "INSERT INTO ";
        let colums = `config (
                    config_id ,
                    attribute ,
                    value 
                )`;

        db.query(createQuery + colums + " VALUES ?", [configValues], (error) => {
            if (error) reject(error);
            console.log("Content config created");
            resolve();
        });
    });
}

rebuildDB().then(() =>
    Promise.all([createUserTable(), createSlotsTable(), createShiftsTable(), createReviewsTable(), createConfigTable()]).then(() => {
        Promise.all([fillConfigTable(), fillUserTable(), fillShiftTable(), fillReviewTable(), fillSlotsTable()]).then(() => {
            process.exit(0);
        });
    })
);
