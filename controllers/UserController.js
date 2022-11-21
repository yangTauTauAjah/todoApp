const UserClass = require('../class/userClass.js')
const TaskClass = require('../class/taskClass.js')
const {userModel} = require('../database/model.js')
const { response, errorHandler } = require('../functions.js')

Date.prototype.toJSON = function() {
  return {
    month: this.getMonth(),
    date: this.getDate(),
    year: this.getFullYear()
  }
}

async function getUser(req, res) {

  const {id} = req.body.userdata

  try {

    const { id: user_id, username, tasks } = await new UserClass()
      .setUserId(id)
      .getUser()
  
    return response(res, 200, true, 'user data retrieved', {user_id,username,tasks})

  } catch(err) { errorHandler(res, err) }

}

async function addTask(req, res) {

  const {id} = req.body.userdata
  const {name,description,due} = req.body

  try {

    const doc = await new TaskClass()
    .setUserId(id)
    .setName(name)
    .setDesc(description)
    .setDueDate(due.month,due.date,due.year)
    .addTask()

    return response(res, 200, true, 'task added', doc)

  } catch(err) { errorHandler(res, err) }

}

async function getTask(req, res) {

  let {id} = req.body.userdata
  let {group} = req.params
  let { cf, ct, df, dt, is_completed } = req.query
  switch (is_completed) {
    case 'true': is_completed = true; break;
    case 'false': is_completed = false; break;
    default: is_completed = null; break;
  }

  

  // const now = new Date()

  try {

    let tasks = (await new UserClass()
    .setUserId(id)
    .getUser())
    .get('tasks')

    let toSend = tasks

    if (cf ?? false) toSend = toSend.filter(task => Date.parse(cf) <= Date.parse(task.last_modified))
    if (ct ?? false) toSend = toSend.filter(task => Date.parse(ct) >= Date.parse(task.last_modified))
    if (df ?? false) toSend = toSend.filter(task => Date.parse(df) <= Date.parse(task.due))
    if (dt ?? false) toSend = toSend.filter(task => Date.parse(dt) >= Date.parse(task.due))
    if (is_completed === true || is_completed === false) toSend = toSend.filter(task => is_completed === task.is_completed)

    /* switch (group) {

      case 'today':
        toSend = tasks.filter(task => task.due > now)
        break;
      case 'completed':
        toSend = tasks.filter(task => task.is_completed)
        break;
      case 'uncompleted':
        toSend = tasks.filter(task => !task.is_completed)
        break;
      default:
        toSend = tasks
        break;

    } */
  
    return response(res, 200, true, 'task retrieved', toSend)

  } catch(err) { errorHandler(res, err) }

}

async function getTaskById(req, res) {

  const {id: taskId} = req.params
  const {id} = req.body.userdata

  try {

    const task = await new TaskClass()
      .setUserId(id)
      .setTaskId(taskId)
      .getTask()

    if (task ?? false) return response(res, 200, true, 'task retrieved', task)
    else return response(res, 404, false, 'task doesn\'t exit')
    

  } catch(err) { errorHandler(res, err) }

}

async function editTask(req, res) {

  const {id: taskId} = req.params
  const {id: userId} = req.body.userdata

  try {

    let task = new TaskClass()
      .setUserId(userId)
      .setTaskId(taskId)

    if (task.getTask() ?? false) {
  
      switch (req.query.task_action) {
    
        case "mark_completed":
          req.body = {}
          task = await task.editTask({is_completed: true})
          break
        case "unmark_completed":
          req.body = {}
          task = await task.editTask({is_completed: false})
          break
        case "edit":
          task = await task.editTask({
            name: req.body.name,
            desc: req.body.desc,
            due: req.body.due,
          })
          break
    
      }
      
      return response(res, 200, true, 'task edited', task)

    } else return response(res, 404, false, 'task doesn\'t exit')

  } catch(err) { errorHandler(res, err) }

}

async function removeTask(req, res) {

  const {id: taskId} = req.params
  const {id: userId} = req.body.userdata

  try {

    const task = await new TaskClass()
      .setUserId(userId)
      .setTaskId(taskId)

    if (await task.getTask() ?? false) {
      await task.removeTask()
      return response(res, 200, true, 'task removed')
    } else {
      return response(res, 422, false, 'task is not exist or might be removed already')
    }

  } catch(err) { errorHandler(res, err) }

}

async function taskAction(req, res) {

  switch (req.query.task_action) {

    case "edit":
    case "mark_completed":
    case "unmark_completed":
      editTask(req, res)
      break
    default:
      getTaskById(req, res)
      break

  }

}

module.exports = { getUser, addTask, removeTask, getTask, taskAction }