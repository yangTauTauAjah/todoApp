import { Edit, Info } from './floatingPanel.js'
import { taskElement, button, global } from './functions.js'

export async function insertTask(data) {

  let listElementString = ''
  const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

  data.forEach(({_id, name: taskName, last_modified, due, is_completed}) => {

    let dateCreated = {
      year: last_modified.year,
      month: MONTHS[last_modified.month],
      date: last_modified.date
    }

    let dueDate = {
      year: due.year,
      month: MONTHS[due.month],
      date: due.date
    }

    listElementString += taskElement(`_${_id}`, taskName, dateCreated, dueDate, is_completed)
  })

  document.querySelector('#tasks').innerHTML = listElementString
  
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

}