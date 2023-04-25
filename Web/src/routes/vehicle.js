const express = require('express');
const router = express.Router();

const vehicleController = require('../app/controllers/VehicleController');

router.get('/', vehicleController.index);

module.exports = router;