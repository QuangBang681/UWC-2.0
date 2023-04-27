const express = require('express');
const router = express.Router();

const vehicleController = require('../app/controllers/VehicleController');

router.get('/', vehicleController.index);
router.get('/assign', vehicleController.assign);
router.patch('/assign/:vehicle_id/:employee_id', vehicleController.assignment);
router.patch('/:id', vehicleController.unassignment);

module.exports = router;