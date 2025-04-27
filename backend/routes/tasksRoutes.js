// const express = require('express');

// const tasksController = require('../controllers/tasksController');

// const router = express.Router();

// router.get('/tasks', tasksController.getTasks);

// router.post('/tasks', tasksController.createTask);

// router.put('/tasks/:id', tasksController.updateTask);

// router.delete('/tasks/:id', tasksController.deleteTask);

// module.exports = router;


const express = require('express');
const tasksController = require('../controllers/tasksController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/tasks', tasksController.getTasks);

router.post('/tasks', tasksController.createTask);

router.put('/tasks/:id', tasksController.updateTask);

router.delete('/tasks/:id', tasksController.deleteTask);

module.exports = router;
