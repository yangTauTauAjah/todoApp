import { button } from './functions.js'

button(
  document.querySelector('#logout'),
  () => { 
    console.log('logged out')
  }
)

button(
  document.querySelector('#show-more'),
  () => { 
    document.querySelector('.nav-link').classList.add('display')
  }
)

button(
  document.querySelector('#show-less'),
  () => { 
    document.querySelector('.nav-link').classList.remove('display')
  }
)