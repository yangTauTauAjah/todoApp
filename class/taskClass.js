const User = require('./userClass.js')
const mongoose = require('mongoose')

class Task {

  constructor() {
    this.user_id = null
    this.id = null
    this.name = null
    this.desc = null
    this.last_modified = null
    this.due = null
    this.is_completed = null
  }

  setUserId(id) { this.user_id = new mongoose.Types.ObjectId(id); return this }
  setTaskId(id) { this.id = new mongoose.Types.ObjectId(id); return this }
  setName(name) { this.name = name; return this }
  setDesc(desc) { this.desc = desc; return this }
  setLastModifiedDate(month, date, year) { this.last_modified = {month, date, year}; return this }
  setDueDate(month, date, year) { this.due = {month, date, year}; return this }
  isCompleted(bool) { this.is_completed = bool; return this }

  async addTask() {

    const doc =
      await new User()
      .setUserId(this.user_id)
      .getUser()

    doc.get('tasks').push({
      name: this.name,
      desc: this.desc,
      due: new Date(
        this.due.year,
        this.due.month,
        this.due.date
      )
    })

    doc.markModified('tasks')

    return (await doc.save()).get('tasks').pop()

  }

  async getTask() {

    return (await new User()
      .setUserId(this.user_id)
      .getUser())
      .get('tasks')
      .id(this.id)
    
  }

  async editTask(edit) {

    const doc =
      await new User()
      .setUserId(this.user_id)
      .getUser()
    
    let task = doc.tasks.id(this.id)
    task.name = edit?.name ?? task?.name
    task.desc = edit?.desc ?? task?.desc
    task.last_modified = new Date(
      edit?.last_modified?.year ?? task?.last_modified.getFullYear(),
      edit?.last_modified?.month ?? task?.last_modified.getMonth(),
      edit?.last_modified?.date ?? task?.last_modified.getDate())
    task.due = new Date(
      edit?.due?.year ?? task?.due.getFullYear(),
      edit?.due?.month ?? task?.due.getMonth(),
      edit?.due?.date ?? task?.due.getDate())
    task.is_completed = edit?.is_completed ?? task?.is_completed

    doc.markModified('tasks')
    await doc.save()

    return {...task._doc}

  }

  async removeTask() {

    const doc = 
      await new User()
      .setUserId(this.user_id)
      .getUser()
    
    await doc.tasks.id(this.id)?.remove()
    doc.markModified('tasks')

    return await doc.save()

  }
}

module.exports = Task