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

