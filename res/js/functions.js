export const global = {}

export function removeArrayElement(array, element) {

  array.find((val, i) => {
    if (val === element) {
      array.splice(i, 1)
      return true
    }
  })

}

export function removeArrayElements(array, ...element) {

  element.forEach(e => {
    removeArrayElement(array, e)
  })

}

export function displayFloatingElement(element, open) {
  switch (open) {
    case false:
      document.body.style.overflowY = 'scroll'
      element.classList.remove('display')
      break;
    case true:
      document.body.style.overflowY = 'hidden'
      element.classList.add('display')
      break;
  }
}

export function floatingElementSwitch(element, openBtn, closeBtn) {

  if (openBtn instanceof Array) {
    openBtn.forEach(btn => {
      btn.addEventListener('click', () => {
        displayFloatingElement(element, false)
      })
    })
  } else {
    openBtn.addEventListener('click', () => {
      displayFloatingElement(element, false)
    })
  }

  if (closeBtn instanceof Array) {
    closeBtn.forEach(btn => {
      btn.addEventListener('click', () => {
        displayFloatingElement(element, true)
      })
    })
  } else {
    closeBtn.addEventListener('click', () => {
      displayFloatingElement(element, true)
    })
  }

}

export function taskElement(id, name, dateCreated, due, is_completed) {

  return `<li><div id="${id}" class="task ${is_completed ? "finished" : ""}">
    <div class="check">
      <img class="" src="/static/svg/final/check.svg" alt="">
    </div>
    <!-- <input class="check" type="checkbox" name="" id=""> -->
    <div class="task-name">
      <p>${name}</p>
      <div></div>
    </div>
    <div class="date-created">
      <p>${dateCreated.month} / ${dateCreated.date} / ${dateCreated.year}</p>
    </div>
    <div class="due">
      <p>Due :</p><span class="space-1"> </span><p>${due.month} / ${due.date} / ${due.year}</p>
    </div>
    <div class="act-btns">
      <img class="info" src="/static/svg/final/info.svg" alt="">
      <img class="edit-self" src="/static/svg/final/edit.svg" alt="">
      <img class="delete-self" src="/static/svg/final/trash.svg" alt="">
    </div>
    <svg class="select" width="76" height="76" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">

      <clipPath id="clip">
        <rect width="200" height="200" />
      </clipPath>

      <svg x="0">
        <animate
          id="anim"
          attributeName="x"
          begin="click"
          from="-200"
          to="0"
          dur="0.1s"
          repeatCount="1"
        />
        <path d="M0 0H130C168.66 0 200 31.3401 200 70V130C200 168.66 168.66 200 130 200H0V0Z" fill="#2958FF"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M166.044 55.9694C172.652 62.5953 172.652 73.3379 166.044 79.9638L101.15 145.031C94.5414 151.656 83.8272 151.656 77.219 145.031L33.9562 101.653C27.3479 95.0268 27.3479 84.2842 33.9562 77.6583C40.5645 71.0325 51.2786 71.0325 57.8869 77.6583L89.1843 109.039L142.113 55.9694C148.721 49.3435 159.436 49.3435 166.044 55.9694Z" fill="#F2F2F2"/>
      </svg>

    </svg>
  </div></li>`

}

export function button(element, callback) {
  element = [].concat(element)
  element.forEach(e => {

      e.addEventListener('click', () => {
        callback(e)
      })

    }
  )
}

export function authorize() {
  fetch('/api/user').then(async (data) => {
    if (!((await data.json()).success)) location = '/login.html'
  }, err => {
    console.error(err)
  })
}