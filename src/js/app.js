import * as dfltFunctions from "./modules/defaultFunctions.js";
import * as mf from "./modules/mainfunctions.js";

dfltFunctions.isWebp();

document.addEventListener('DOMContentLoaded', function () {
  //load default values
  mf.checkThemeFromStorage('todo')
  mf.setTheme('todo')
  mf.parseTasksAndAddToTaskManager()
})


//toggle themes
const themeToggle = document.querySelector('.todo__theme-toggle')
themeToggle.addEventListener('click', function () {
  mf.toggleTheme('todo')
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

  //toggle status of task
  if (e.target.closest('.task-manager__item-list') && !e.target.closest('.tabs-block__delete')) {
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

  //tabs for menu
  if (e.target.classList.contains('menu__tabs')) {
    mf.tabsHandler('menu__tabs', 'menu__btn--active', e.target)
    mf.parseTasksAndAddToTaskManager()
  }

  //remove task
  if (e.target.closest('.tabs-block__delete')) {
    let target = e.target.closest('.task-manager__item-list')
    mf.removeTask(target);
  }
})


//remove completer tasks
const removeCompleted = document.querySelector('.menu__clear')
removeCompleted.addEventListener('click', () => {
  mf.clearCompleted()
})


let idBeforeTarget;
let willInsertAfter;
const taskList = document.getElementById('task-manager');
const sortable = Sortable.create(taskList, {
  onMove: function (evt) {
    idBeforeTarget = evt.related.dataset.id
    willInsertAfter = evt.willInsertAfter;
  },
  onUpdate: function (evt) {
    mf.changeId(evt.item.dataset.id, idBeforeTarget, willInsertAfter)
  }
});
