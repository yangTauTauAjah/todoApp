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

  async editTask({name, desc, due = {}}, is_completed) {

    const doc =
      await new User()
      .setUserId(this.user_id)
      .getUser()
    
    const task = doc.tasks.id(this.id)
    task = {
      name: name ?? task.name,
      desc: desc ?? task.desc,
      last_modified: new Date() ?? task.last_modified,
      due: new Date(
        due.year ?? task.due.getFullYear(),
        due.month ?? task.due.getMonth(),
        due.date ?? task.due.getDate()
      ),
      is_completed: is_completed ?? task.is_completed
    }

    doc.markModified('tasks')
    await doc.save()

    return {id: this.id, ...task}

  }

  async removeTask() {

    const doc = 
      await new User()
      .setUserId(this.user_id)
      .getUser()
    
    await doc.tasks.id(this.id).remove()
    doc.markModified('tasks')

    return await doc.save()

  }
}

module.exports = Task