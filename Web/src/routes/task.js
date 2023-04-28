const express = require('express');
const router = express.Router();

const taskController = require('../app/controllers/TaskController');

router.get('/:id/assign', taskController.assign);
router.get('/', taskController.index);
router.post('/:id/assign', taskController.assignment);
router.post('/', taskController.create);
router.delete('/:id', taskController.destroy);
router.patch('/:id', taskController.update);

module.exports = router;