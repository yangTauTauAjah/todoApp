const mongoose = require('mongoose')
const UserClass = require('../class/userClass.js')
const { userModel } = require('../database/model.js')
const TaskClass = require('../class/taskClass.js')
const { response } = require('../functions.js')

async function getUser(req, res) {

  const { id } = req.body.userdata

  const user = await new UserClass()
    .setUserId(id)
    .getUser()

  return response(res, 200, true, 'user data retrieved', user)

}

async function addTask(req, res) {

  const {id} = req.query

  const {name, description, due} = req.body

  const doc = await new TaskClass()
    .setUserId(id)
    .setName(name)
    .setDesc(description)
    .setDueDate(due.month,due.date,due.year)
    .addTask()

  return response(res, 200, true, 'task added', doc)

}

async function getAllTask(req, res) {

  const { id } = req.body

  const tasks = (await new UserClass()
  .setUserId(id)
  .getUser())
  .get('tasks')

  return response(res, 200, true, 'all task', tasks)

}

async function getTask(req, res) {

  const {id: taskId} = req.params
  const {id} = req.query

  const task = await new TaskClass()
    .setUserId(id)
    .setTaskId(taskId)
    .getTask()

  return response(res, 200, true, 'task retrieved', task)

}

async function editTask(req, res) {

  const {id: taskId} = req.params
  const {id: userId, task_action} = req.query
  let is_completed

  switch (task_action) {
    case "mark_completed":
      req.body = {}
      is_completed = true
      break
    case "unmark_completed":
      req.body = {}
      is_completed = false
      break
  }

  const {name, desc, due} = req.body

  const edited_task = await new TaskClass()
    .setUserId(userId)
    .setTaskId(taskId)
    .editTask({ name, desc, due }, is_completed)

  return response(res, 200, true, 'task edited', edited_task)

}

async function removeTask(req, res) {

  const {id: taskId} = req.params
  const {id: userId} = req.query

  /* await new TaskClass()
  .setUserId(userId)
  .setTaskId(taskId)
  .removeTask() */
  console.log(req.body)
  

  return response(res, 200, true, 'task removed')

}

async function taskAction(req, res) {

  switch (req.query.task_action) {

    case "edit":
    case "mark_completed":
    case "unmark_completed":
      editTask(req, res)
      break
    default:
      getTask(req, res)
      break

  }

}

module.exports = { getUser, addTask, removeTask, getAllTask, getTask, taskAction }