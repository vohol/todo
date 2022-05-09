//function for toggle themes for section
export function newNightTheme(classOfSection) {
  const section = document.querySelector(`.${classOfSection}`);
  let newTheme;

  switch (section.dataset.theme) {
    case "night":
      newTheme = "day";
      break;
    case "day":
      newTheme = "night";
      break;
  }
  section.dataset.theme = newTheme;
}

//function to set theme for section
export function setTheme(classOfSection) {
  const section = document.querySelector(`.${classOfSection}`);
  let fontColor;
  let taskBg;
  let borderColor;
  let placeHolderColor;
  let btnTextColor;
  let shadow;

  switch (section.dataset.theme) {
    case "night":
      fontColor = "#fff";
      taskBg = "#25273D";
      borderColor = "#393A4B";
      placeHolderColor = "#767992";
      btnTextColor = "#5B5E7E";
      shadow = '0px 35px 50px -15px rgba(0, 0, 0, 0.5)'
      break;
    case "day":
      fontColor = "#000";
      taskBg = "#fff";
      borderColor = "#E3E4F1";
      placeHolderColor = "#9495A5";
      btnTextColor = "#9495A5";
      shadow = '0px 35px 50px -15px rgba(194, 195, 214, 0.5)'
      break;
  }
  section.style.setProperty("--font-color", fontColor);
  section.style.setProperty("--task-bg", taskBg);
  section.style.setProperty("--border-color", borderColor);
  section.style.setProperty("--place-holder-color", placeHolderColor);
  section.style.setProperty("--btn-text-color", btnTextColor);
  section.style.setProperty("--shadow", shadow);
}

export function addTask(inputID, idMarker) {
  const input = document.getElementById(inputID)
  const doneMarker = document.getElementById(idMarker)
  let task = {
    id: Date.now(),
    task: input.value,
    status: doneMarker.checked ? Date.now() : 'active',
  }
  console.log(task);
  addTaskToStorage(task)
  input.value = ''
  parseTasksAndAddToTaskManager()
}

export function addTaskToStorage(newTask) {
  let getAllTasks = JSON.parse(localStorage.getItem('storage'));
  getAllTasks ? getAllTasks : getAllTasks = []
  getAllTasks.push(newTask);
  JSON.stringify(getAllTasks)
  localStorage.setItem('storage', JSON.stringify(getAllTasks))
}

export function parseTasksAndAddToTaskManager() {
  let getAllTasks = JSON.parse(localStorage.getItem('storage'));

  const taskManager = document.querySelector('.task-manager')
  taskManager.innerHTML = ''


  const activeTasks = getAllTasks.filter(task => task.status == 'active')
  const doneTasks = getAllTasks.filter(task => task.status != 'active')

  const sortedActiveTasks = activeTasks.sort(function (a, b) {
    return b.id - a.id;
  })
  const SortedDoneTasks = doneTasks.sort(function (a, b) {
    return b.status - a.status;
  })

  sortedActiveTasks.forEach(element => {

    let task = document.createElement("li");
    task.classList.add('task-manager__item-list')
    task.innerHTML = `
  <label class="task-block task-manager__task">
    <label class="main-checkbox task-block__checkbox">
      <input type="checkbox" class="main-checkbox__check">
      <span class="main-checkbox__mark"></span>
    </label>
    <span class="task-block__text">${element.task}</span>
    <button class="task-block__btn">
      <svg class="close-icon task-block__icon">
        <use xlink:href="@img/icons/icons-mono.svg#close"></use>
      </svg>
    </button>
  </label>
  `;
    taskManager.appendChild(task)
  });

  SortedDoneTasks.forEach(element => {

    let task = document.createElement("li");
    task.classList.add('task-manager__item-list')
    task.classList.add('done')
    task.innerHTML = `
  <label class="task-block task-manager__task">
    <label class="main-checkbox task-block__checkbox">
      <input type="checkbox" class="main-checkbox__check" checked>
      <span class="main-checkbox__mark"></span>
    </label>
    <span class="task-block__text">${element.task}</span>
    <button class="task-block__btn">
      <svg class="close-icon task-block__icon">
        <use xlink:href="@img/icons/icons-mono.svg#close"></use>
      </svg>
    </button>
  </label>
  `;
    taskManager.appendChild(task)
  });


  //addding task
  /*
  const task = document.createElement("li");
  task.classList.add('task-manager__item-list')
  task.innerHTML = `
  <label class="task-block task-manager__task">
    <label class="main-checkbox task-block__checkbox">
      <input type="checkbox" class="main-checkbox__check">
      <span class="main-checkbox__mark"></span>
    </label>
    <span class="task-block__text">${task}</span>
    <button class="task-block__btn">
      <svg class="close-icon task-block__icon">
        <use xlink:href="@img/icons/icons-mono.svg#close"></use>
      </svg>
    </button>
  </label>
  `;
*/

}