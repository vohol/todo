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

const btnToAddNewTask = document.querySelector('.new-task__btn')
btnToAddNewTask.addEventListener('click', function () {
  mf.addTask('new-task', 'new-task-done');
})