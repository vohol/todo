import * as dfltFunctions from "./modules/defaultFunctions.js";
import * as mf from "./modules/mainfunctions.js";


dfltFunctions.isWebp();

document.addEventListener('DOMContentLoaded', function () {
  //load default values
  mf.setTheme('todo')
  mf.parseTasksAndAddToTaskManager()
})


//toggle themes
const themeToggle = document.querySelector('.todo__theme-toggle')
themeToggle.addEventListener('click', function () {
  mf.newNightTheme('todo')
  mf.setTheme('todo')
})


//add new task by pressing plus-btn
const btnToAddNewTask = document.querySelector('.new-task__btn')
btnToAddNewTask.addEventListener('click', function () {
  mf.addTask('new-task', 'new-task-done');
})


document.addEventListener('keyup', function (e) {

  //add new task by pressing Enter
  if (e.target.id == 'new-task' && e.key == 'Enter') {
    mf.addTask('new-task', 'new-task-done');
  }
})


document.addEventListener('click', function (e) {

  if (e.target.closest('.task-manager__item-list')) {
    let target = e.target.closest('.task-manager__item-list')

    switch (target.classList.contains('done')) {
      case true:
        mf.toggleTaskStatus(target, 'done')
        break;
      case false:
        mf.toggleTaskStatus(target, 'active')
        break;
    }
  }
})

//filter all taskt
const filerAll = document.querySelector('.menu__all')
filerAll.addEventListener('click', () => {
  mf.parseTasksAndAddToTaskManager()
})
//filter active taskt
const filerActive = document.querySelector('.menu__active')
filerActive.addEventListener('click', () => {
  mf.filterTasks('active')
})
//filter completed taskt
const filerCompleted = document.querySelector('.menu__completed')
filerCompleted.addEventListener('click', () => {
  mf.filterTasks('done')
})
//remove completer tasks
const removeCompleted = document.querySelector('.menu__clear')
removeCompleted.addEventListener('click', () => {
  mf.clearCompleted()
})

let tempId;
const taskList = document.getElementById('task-manager');
const sortable = Sortable.create(taskList, {
  onMove: function (evt) {
    tempId = evt.related.dataset.id - (evt.related.dataset.id - evt.related.previousElementSibling.dataset.id) / 2
    // console.log(evt.related.dataset.id);
    // console.log(evt.related.previousElementSibling.dataset.id);
    // console.log(tempId);
  },
  onUpdate: function (evt) {
    console.log(evt.item);
    mf.changeId(evt.item, tempId)
  }
});