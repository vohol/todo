export function newNightTheme(classOfSection) {
  const section = document.querySelector(`.${classOfSection}`)
  let newTheme;

  switch (section.dataset.theme) {
    case 'night':
      newTheme = 'day'
      break;
    case 'day':
      newTheme = 'night'
      break;
  }
  section.dataset.theme = newTheme
}

export function setTheme(classOfSection) {
  const section = document.querySelector(`.${classOfSection}`)
  let fontColor; let taskBg;
  let borderColor;

  switch (section.dataset.theme) {
    case 'night':
      fontColor = '#fff'
      taskBg = '#25273D'
      borderColor = '#393A4B'
      placeHolderColor = '#767992'
      break;
    case 'day':
      fontColor = '#000'
      taskBg = '#fff'
      borderColor = '#E3E4F1'
      placeHolderColor = '#9495A5'
      break;
  }
  section.style.setProperty("--font-color", fontColor);
  section.style.setProperty("--task-bg", taskBg);
  section.style.setProperty("--border-color", borderColor);
  section.style.setProperty("--place-holder-color", placeHolderColor);
}