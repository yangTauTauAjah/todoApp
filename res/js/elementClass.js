import { displayFloatingElement, button } from "./functions.js";

export const ElementClass = class ElementClass {

  constructor () {
    this.id = null
  }

  setId(id) { this.id = id; return this }

  getElement() { return document.querySelector(`#${this.id}`) }

  getChild() { return this.getElement().children }

  getParent() { return this.getElement().parentNode }
}

export const FloatingElement = class FloatElementClass extends ElementClass {

  constructor() {
    super()
    this.openBtn = []
    this.closeBtn = []
  }

  setOpenBtn(element) {
    this.openBtn = this.openBtn.concat(element)
    
    button(
      this.openBtn,
      () => { displayFloatingElement(this.getParent(), true) }
    )

    return this
  }

  setCloseBtn(element) {
    this.closeBtn = this.closeBtn.concat(element)
    
    button(
      this.closeBtn,
      () => { displayFloatingElement(this.getParent(), false) }
    )

    return this
  }

}

export const IndividualTaskElement = class Task extends ElementClass {
  
  constructor() {
    super()
    this.taskName = null
    this.taskDesc = null
    this.taskDue = null
    this.dateCreated = null
  }

  setTaskName(name) { this.taskName = name; return this }
  setTaskDesc(desc) { this.taskDesc = desc; return this }
  setTaskDue(due) { this.taskDue = due ; return this }
  setDateCreated(date) { this.dateCreated = date ; return this }
  getElement() { return document.querySelector(`#tasks > li > div#${this.id}`) }

}

/* export const TaskInfoElement = class TaskInfoElementClass extends FloatingElement {

  constructor() {
    super()
    this.id = 'task-info-box'
    this.taskName = null
    this.taskDesc = null
  }

  setTaskName(name) { 
    this.taskName = name
    this.openBtn.addEventListener(() => {
      this
      .getElement()
      .querySelector('.task-name > .task-name > div > p')
      .textContent = name
    })
    return this
  }
  
  setTaskDesc(desc) {
    this.taskDesc = desc
    this.openBtn.addEventListener(() => {
      this
      .getElement()
      .querySelector('.task-name > .task-name > div > p')
      .textContent = desc
    })
    return this}

} */