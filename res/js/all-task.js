import { button, taskElement } from './functions.js'
import { newTaskPanel, Edit, Info } from './floatingPanel.js'
import { insertTask } from './functions.js'
import { global } from './functions.js'

// const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']


/* const data = {
  id: '123',
  taskName: 'nganggur',
  dateCreated: {
    date: 3,
    month: 'dec',
    year: 2006
  },
  due: {
    date: 3,
    month: 'dec',
    year: 2006
  },
  desc: 'Lorem ipsum dolor sit amet'
} */
fetch('/api/user/task').then(async (tasks) => {

  const {data} = await tasks.json()

  button(
    document.querySelector('#Delete'),
    async () => {
      const checked = document.querySelectorAll('#tasks .task.selected')
      
      for (let task of checked) {
        await fetch(`/api/user/removeTask/${task.id.slice(1)}`, {method: 'delete'})
      }
      
      location.reload()
    }
  )
  
  button(
    (await Edit).getElement().querySelector('.flex-1-line-h > button:nth-child(2)'),
    async () => {

      const {_id, name, desc} = global.taskToEdit

      const body = {
        name: document.querySelector('#edit-box input[name="task-name"]').value,
        desc: document.querySelector('#edit-box input[name="task-desc"]').value
      }

      await fetch(
        `/api/user/task/${_id}?task_action=edit`,
        {
          method: 'post',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            name: body.name.length > 0 ? body.name : name,
            desc: body.desc.length > 0 ? body.desc : desc
          })
        }
      )
      location.reload()

    }
  )

  button(
    (await newTaskPanel).getElement().querySelector('.flex-1-line-h button:nth-child(2)'),
    () => {

      let [year, month, date] = document.querySelector('#new-task-box input[name="task-due"]').value.split('-')
      month--

      console.log(month)
        
      fetch(`/api/user/addTask`, {
        method: 'put',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: document.querySelector('#new-task-box input[name="task-name"]').value,
          description: document.querySelector('#new-task-box input[name="task-desc"]').value,
          due: {month, date, year}
        })
      })
      location.reload()
    }
  )
  
  insertTask(data)
  
}).catch(err => console.error(err))