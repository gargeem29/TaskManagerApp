const router = require('express').Router()
const { createTask, deleteTask, getAllTasks, getSingleTask, updateTask } = require('../controllers/task.controller')
const { isAuth } = require('../utils/auth')

router.get('/tasks', isAuth, getAllTasks)
router.get('/tasks/:id', isAuth, getSingleTask)
router.post('/tasks', isAuth, createTask)
router.put('/tasks/:id', isAuth, updateTask)
router.delete('/tasks/:id', isAuth, deleteTask)

module.exports = router 
