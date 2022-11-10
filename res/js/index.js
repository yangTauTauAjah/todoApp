import { button, taskElement } from './functions.js'
import { Edit, Info } from './floatingPanel.js'

export let global = {}

const data = [

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
]


button(
  document.querySelector('#Delete'),
  () => {
    const checked = document.querySelectorAll('#tasks .task.selected')
    console.log(checked)
  }
)

button(
  (await Edit).getElement().querySelector('.flex-1-line-h > button:nth-child(2)'),
  () => { console.log(global.taskToDelete) }
)





data.forEach(({id, taskName, dateCreated, due}) => {
  document.querySelector('#tasks').innerHTML += taskElement(`_${id}`, taskName, dateCreated, due)
})

document.querySelectorAll('#tasks .task').forEach(async element => {
  const {id, taskName, desc} = data.find(data => data.id === element.id.slice(1))

  button(
    element.querySelector('.task .check'),
    e => {
  
      if (e.parentNode.classList.contains('finished'))
        e.parentNode.classList.remove('finished')
      else
        e.parentNode.classList.add('finished')
    
    }
  )

  button(
    element.querySelector(`#_${id} .info`),
    async () => {
      const infoBox = (await Info).getElement()

      infoBox.querySelector('.task-name > div > p')
      .textContent = taskName

      
      infoBox.querySelector('.task-desc > div > p')
      .textContent = desc
    }
  )
    
  button(
    element.querySelector(`#_${id} .edit-self`),
    async () => { global.taskToDelete = id }
  )

  button(
    element.querySelector('.task .delete-self'),
    () => { console.log(element) }
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