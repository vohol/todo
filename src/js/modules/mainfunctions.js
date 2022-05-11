let allTasks
localStorage.getItem('storage')
  ? (allTasks = JSON.parse(localStorage.getItem('storage')))
  : (allTasks = [])

//function for toggle themes for section
export function newNightTheme(classOfSection) {
  const section = document.querySelector(`.${classOfSection}`)
  let newTheme

  switch (section.dataset.theme) {
    case 'night':
      newTheme = 'day'
      break
    case 'day':
      newTheme = 'night'
      break
  }
  section.dataset.theme = newTheme
}

//function to set theme for section
export function setTheme(classOfSection) {
  const section = document.querySelector(`.${classOfSection}`)
  let fontColor
  let taskBg
  let borderColor
  let placeHolderColor
  let btnTextColor
  let shadow
  let hoverMenuBtns

  switch (section.dataset.theme) {
    case 'night':
      fontColor = '#fff'
      taskBg = '#25273D'
      borderColor = '#393A4B'
      placeHolderColor = '#767992'
      btnTextColor = '#5B5E7E'
      shadow = '0px 35px 50px -15px rgba(0, 0, 0, 0.5)'
      hoverMenuBtns = '#fff'
      break
    case 'day':
      fontColor = '#000'
      taskBg = '#fff'
      borderColor = '#E3E4F1'
      placeHolderColor = '#9495A5'
      btnTextColor = '#9495A5'
      shadow = '0px 35px 50px -15px rgba(194, 195, 214, 0.5)'
      hoverMenuBtns = '#494C6B'
      break
  }
  section.style.setProperty('--font-color', fontColor)
  section.style.setProperty('--task-bg', taskBg)
  section.style.setProperty('--border-color', borderColor)
  section.style.setProperty('--place-holder-color', placeHolderColor)
  section.style.setProperty('--btn-text-color', btnTextColor)
  section.style.setProperty('--shadow', shadow)
  section.style.setProperty('--hover-memu-btn', hoverMenuBtns)
}


export function addTask(inputID, idMarker) {
  const input = document.getElementById(inputID)
  const doneMarker = document.getElementById(idMarker)
  let task = {
    id: allTasks.length + 1,
    task: input.value,
    status: doneMarker.checked ? 'done' : 'active',
  }
  if (input.value) {
    addTaskToStorage(task)
    input.value = ''
    doneMarker.checked = false
    parseTasksAndAddToTaskManager()
  } else {
    alert(`You can't add empty task!`)
  }
}


export function addTaskToStorage(newTask) {
  allTasks.push(newTask)
  localStorage.setItem('storage', JSON.stringify(allTasks))
}


export function parseTasksAndAddToTaskManager(array = allTasks) {
  const counter = document.querySelector('.menu__counter')
  const counterDesxription = document.querySelector('.menu__text')
  const menuBtns = document.querySelector('.menu__btn--active')
  let filtredTasks;

  const taskManager = document.querySelector('.task-manager')
  taskManager.innerHTML = ''

  const activeTasks = array.filter((task) => task.status == 'active')


  if (menuBtns.id == 'active' || menuBtns.id == 'done') {
    filtredTasks = array.filter((task) => task.status == menuBtns.id)
  } else {
    filtredTasks = array
  }

  switch (activeTasks.length) {
    case 0:
      counterDesxription.textContent = 'Nothing to do'
      break
    case 1:
      counterDesxription.textContent = 'item left'
      break
    default:
      counterDesxription.textContent = 'items left'
      break
  }
  let sortedTask = sortTasksById(filtredTasks)
  sortedTask.forEach((element) => {
    let task = document.createElement('li')
    task.classList.add('task-manager__item-list')
    task.dataset.id = element.id

    let checkboxStatus = ''
    if (element.status == 'done') {
      task.classList.add('done')
      checkboxStatus = 'checked'
    }

    task.innerHTML = `
    <label class="task-block task-manager__task">
      <label class="main-checkbox task-block__checkbox">
        <input type="checkbox" class="main-checkbox__check" ${checkboxStatus}>
        <span class="main-checkbox__mark"></span>
      </label>
      <span class="task-block__text">${element.task}</span>
      <button class="task-block__btn tabs-block__delete">
        <svg class="close-icon task-block__icon">
          <use xlink:href="img/icons/icons-mono.svg#close"></use>
        </svg>
      </button>
    </label>
    `
    taskManager.appendChild(task)
  })
  counter.textContent = activeTasks.length ? activeTasks.length : ''
}


function sortTasksById(array) {
  return array.sort(function (a, b) {
    return b.id - a.id
  })
}


export function toggleTaskStatus(domTaskItem, status) {
  let newStatus

  switch (status) {
    case 'done':
      domTaskItem.classList.remove('done')
      newStatus = 'active'
      break
    case 'active':
      domTaskItem.classList.add('done')
      newStatus = 'done'
      break
  }

  let targetTask = allTasks.filter(
    (task) => task.id == domTaskItem.dataset.id
  )[0]

  let allTasksWithoutTarget = allTasks.filter(
    (task) => task.id != domTaskItem.dataset.id
  )
  allTasks = allTasksWithoutTarget

  targetTask.status = newStatus

  addTaskToStorage(targetTask)
  parseTasksAndAddToTaskManager()
}


// export function filterTasks(status, array = allTasks) {
//   const filtredTasks = array.filter((task) => task.status == status)
//   parseTasksAndAddToTaskManager(filtredTasks)
// }


export function clearCompleted(array = allTasks) {
  const btnAllTasks = document.querySelector('.menu__all')
  let tempArray = array.filter((task) => task.status == 'active')
  allTasks = tempArray
  localStorage.setItem('storage', JSON.stringify(allTasks))
  parseTasksAndAddToTaskManager()
  tabsHandler('menu__tabs', 'menu__btn--active', btnAllTasks)
}


export function changeId(idTarget, idBeforeTarget, willInsertAfter) {
  let allTasksBeforeTarget
  let allTasksAfterTarget
  let allTasksWithoutTarget = allTasks.filter((task) => task.id != idTarget)
  let targetTask = allTasks.filter((task) => task.id == idTarget)[0]

  switch (willInsertAfter) {
    case false:
      allTasksBeforeTarget = allTasksWithoutTarget.filter(
        (task) => task.id <= idBeforeTarget
      )
      allTasksAfterTarget = allTasksWithoutTarget.filter(
        (task) => task.id > idBeforeTarget
      )
      break

    case true:
      allTasksBeforeTarget = allTasksWithoutTarget.filter(
        (task) => task.id < idBeforeTarget
      )
      allTasksAfterTarget = allTasksWithoutTarget.filter(
        (task) => task.id >= idBeforeTarget
      )
      break
  }

  allTasks.length = 0
  allTasksBeforeTarget
    .slice()
    .reverse()
    .forEach((element) => {
      element.id = allTasks.length + 1
      addTaskToStorage(element)
    })

  targetTask.id = allTasks.length + 1
  addTaskToStorage(targetTask)

  allTasksAfterTarget
    .slice()
    .reverse()
    .forEach((element) => {
      element.id = allTasks.length + 1
      addTaskToStorage(element)
    })

  allTasks.forEach((element) => {
  })
  parseTasksAndAddToTaskManager()
}


export function tabsHandler(tabsClass, activeClass, target) {
  const tabs = document.querySelectorAll(`.${tabsClass}`)
  tabs.forEach((element) => {
    element.classList.remove(activeClass)
  })
  target.classList.add(activeClass)
}

export function removeTask(targetTask) {

  let allTasksWithoutTarget = allTasks.filter((task) => task.id != targetTask.dataset.id)
  allTasks.length = 0

  if (allTasksWithoutTarget.length == 0) {
    localStorage.setItem('storage', JSON.stringify(allTasks))
  } else {
    allTasksWithoutTarget
      .slice()
      .reverse()
      .forEach((element) => {
        element.id = allTasks.length + 1
        addTaskToStorage(element)
      })
  }

  parseTasksAndAddToTaskManager()
}