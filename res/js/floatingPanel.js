import { FloatingElement } from './elementClass.js'


export const newTaskPanel = (async () => {
  return new FloatingElement()
  .setId('new-task-box')
  .setOpenBtn(document.querySelector('#new-task'))
  .setCloseBtn(document.querySelector('#new-task-box .flex-1-line-h').children[0])
})()
  


export const Filter = (async () => {
  return new FloatingElement()
  .setId('filter-box')
  .setOpenBtn(document.querySelector('#filter'))
  .setCloseBtn(document.querySelector('#filter-box .flex-1-line-h').children[0])
})()



export const Edit = (async () => {
  return new FloatingElement()
  .setId('edit-box')
  .setOpenBtn(document.querySelector('#Edit'))
  .setCloseBtn(document.querySelector('#edit-box .flex-1-line-h').children[0])
})()
  


export const Info = (async () => {
  return new FloatingElement()
  .setId('task-info-box')
  .setCloseBtn(document.querySelector('#task-info-box .close-btn'))
})()