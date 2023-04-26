const express = require('express');
const router = express.Router();

const taskController = require('../app/controllers/TaskController');

// router.get('/search', taskController.filter);
router.get('/', taskController.index);
router.post('/', taskController.create)
router.delete('/:id', taskController.destroy);
router.patch('/:id', taskController.update);

module.exports = router;