const themes = {
  green: {
    "--background-theme": "rgb(38, 194, 189)",
    "--background-theme-hover": "rgb(38, 194, 189)",
  },
  blue: {
    "--background-theme": "rgb(5, 64, 243)",
    "--background-theme-hover": "rgb(5, 64, 243)",
  },
  dark: {
    "--background-theme": "rgb(12, 50, 63)",
    "--background-theme-hover": "rgb(12, 50, 63)",
  },
};
let lastSelectedTheme = localStorage.getItem("app-theme") || "blue";

const themesColorContainer = document.querySelector(".themes-color-submenu");

themesColorContainer.addEventListener("click", onThemesHandler);

function onThemesHandler(e) {
  const titleText = document.querySelector(".themes-color-menu__text");
  if (e.target.classList.contains("themes-color-submenu__text")) {
    titleText.textContent = e.target.textContent;
    const parent = e.target.closest("[id]");
    const id = parent.id;
    setTheme(id);
    lastSelectedTheme = id;
    localStorage.setItem("app-theme", lastSelectedTheme);
  }
}
function setTheme(name) {
  const selectedThemeObject = themes[name];
  Object.entries(selectedThemeObject).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}
setTheme(lastSelectedTheme);
