const mongoose = require('mongoose')
const router = require('express').Router()
const { getUser, addTask, getAllTask, taskAction }  = require('../controllers/UserController.js')

router.get('/', getUser)
router.put('/addTask', addTask)
router.get('/task', getAllTask)
router.post('/task/:id', taskAction)

module.exports = router