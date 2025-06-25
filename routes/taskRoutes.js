const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTasks);
router.get('/tasks/new', taskController.renderNewTaskForm);
router.post('/tasks', taskController.createTask);
router.get('/tasks/edit/:id', taskController.renderEditTaskForm);
router.post('/tasks/edit/:id', taskController.updateTask);
router.post('/tasks/delete/:id', taskController.deleteTask);

module.exports = router;
