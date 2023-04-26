const express = require('express');
const router = express.Router();

const taskController = require('../app/controllers/TaskController');

router.get('/', taskController.index);
router.post('/', taskController.create)
router.delete('/:id', taskController.destroy);

module.exports = router;