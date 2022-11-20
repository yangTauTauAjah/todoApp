import { button, taskElement } from './functions.js'
import { newTaskPanel, Edit, Info } from './floatingPanel.js'

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

export const global = {}

/* const data = [

  {
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
  },
  {
    id: '456',
    taskName: 'apalah daya',
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
  },
  {
    id: '789',
    taskName: 'heng katon',
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
  },
  {
    id: '134',
    taskName: 'bah...',
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
  }
] */
fetch('/api/user/task').then(async (tasks) => {

  const data = (await tasks.json()).data

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
  
  
  
  
  
  data.forEach(({_id, name: taskName, last_modified, due, is_completed}) => {
    last_modified.month = MONTHS[last_modified.month]
    due.month = MONTHS[due.month]
    document.querySelector('#tasks').innerHTML += taskElement(`_${_id}`, taskName, last_modified, due, is_completed)
  })
  
  document.querySelectorAll('#tasks .task').forEach(async element => {
    const {_id, name: taskName, desc} = data.find(data => data._id === element.id.slice(1))
  
    button(
      element.querySelector('.task .check'),
      e => {
    
        if (e.parentNode.classList.contains('finished')) {

          fetch(`/api/user/task/${_id}?task_action=unmark_completed`, {method: 'post'})
          e.parentNode.classList.remove('finished')

        } else {

          fetch(`/api/user/task/${_id}?task_action=mark_completed`, {method: 'post'})
          e.parentNode.classList.add('finished')

        }
      
      }
    )
  
    button(
      element.querySelector(`#_${_id} .info`),
      async () => {
        const infoBox = (await Info).getElement()
  
        infoBox.querySelector('.task-name > div > p')
        .textContent = taskName
  
        
        infoBox.querySelector('.task-desc > div > p')
        .textContent = desc
      }
    )
      
    button(
      element.querySelector(`.edit-self`),
      async () => { global.taskToEdit = {_id, name: taskName, desc} }
    )
  
    button(
      element.querySelector(`.delete-self`),
      async () => {
        await fetch(`/api/user/removeTask/${_id}`, {method: 'delete'})
        location.reload()
      }
    )
  
  
  
  
  
  
    let handler
  
    element.addEventListener('mousedown', () => {
      if (global.holdMode) {
  
        if (element.classList.contains('selected')) {
  
          const svg = element.querySelector('.select > svg > animate')
          svg.setAttribute('from', "0")
          svg.setAttribute('to', "-200")
          svg.parentElement.dispatchEvent(new Event('click'))
  
          setTimeout(() => {
            element.classList.remove('selected')
            if (!(document.querySelectorAll('#tasks .task.selected').length)) {
              global.holdMode = false
              document.querySelector('#Delete').classList.remove('display')
            }
          }, 50)
  
        } else {
  
          element.classList.add('selected')
  
          const svg = element.querySelector('.select > svg > animate')
          svg.setAttribute('from', "-200")
          svg.setAttribute('to', "0")
          svg.parentElement.dispatchEvent(new Event('click'))
  
        }
  
        setTimeout(() => {
          if ( document.querySelectorAll('#tasks .task.selected').length !== 1 )
            document.querySelector('#Edit').classList.remove('display')
          else
            document.querySelector('#Edit').classList.add('display')
        }, 100)
  
      } else {
  
        handler = setTimeout(() => {
  
          global.holdMode = true
  
          element.classList.add('selected')
  
          document.querySelector('#Edit').classList.add('display')
          document.querySelector('#Delete').classList.add('display')
  
          const svg = element.querySelector('.select > svg > animate')
          svg.setAttribute('from', "-200")
          svg.setAttribute('to', "0")
          svg.parentElement.dispatchEvent(new Event('click'))
  
        }, 500)
        
      }
    })
  
    element.addEventListener('mouseup', (e) => {
      clearTimeout(handler)
    })
  
  
    ;(await Info).setOpenBtn(element.querySelector('.info'))
    ;(await Edit).setOpenBtn(element.querySelector('.edit-self'))
  
  })

}).catch(err => console.error(err))