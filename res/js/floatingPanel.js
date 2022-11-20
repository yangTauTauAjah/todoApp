import { FloatingElement } from './elementClass.js'
import { button } from './functions.js'


export const newTaskPanel = (async () => {
  return new FloatingElement()
  .setId('new-task-box')
  .setOpenBtn(document.querySelector('#new-task'))
  .setCloseBtn(document.querySelector('#new-task-box .flex-1-line-h').children[0])
})();
  
(async () => {
  
  (await newTaskPanel)
    .getElement()
    .querySelector('.flex-1-line-h button:nth-child(2)')
    .addEventListener(
      'click',
      (e) => {

        const [year, month, date] = document.querySelector('#new-task-box input[name="task-due"]').value.split('-')
          
        fetch(`/api/addTask`, {
          method: 'put',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: document.querySelector('#new-task-box input[name="task-name"]').value,
            description: document.querySelector('#new-task-box input[name="task-desc"]').value,
            due: {month, date, year}
          })
        }).then(async (data) => {
          console.log(await data.json())
        })
      }
    )
  
})();



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