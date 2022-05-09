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