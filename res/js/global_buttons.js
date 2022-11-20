import { button } from './functions.js'

button(
  document.querySelector('#logout'),
  () => { 
    fetch('/api/auth/logout', {
      credentials: 'same-origin'
    }).then(async (res) => {

      if ((await res.json()).success) location = '/login.html'

    })
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