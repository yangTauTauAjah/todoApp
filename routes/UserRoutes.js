const router = require('express').Router()
const { getUser, addTask, removeTask, getTask, taskAction }  = require('../controllers/UserController.js')

 router.get('/', getUser)
 router.put('/addTask', addTask)
router.post('/removeTask/:id', removeTask)
 router.get('/task', getTask)
router.post('/task/:id', taskAction)

module.exports = router