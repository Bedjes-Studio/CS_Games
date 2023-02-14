const express = require('express');
const router = express.Router();

const carCtrl = require('../controllers/car');
const auth = require('../middleware/auth');

router.post('/create', auth, carCtrl.createCar);

module.exports = router;