const express = require('express');
const router = express.Router();

const mcpController = require('../app/controllers/McpController');

router.get('/', mcpController.index);
router.get('/assign', mcpController.assign);
router.patch('/assign/:vehicle_id/:employee_id', mcpController.assignment);
router.patch('/:id', mcpController.unassignment);

module.exports = router;