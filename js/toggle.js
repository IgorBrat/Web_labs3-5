const CLOSE_CLASSNAME = "close";
const OPEN_CLASSNAME = "open";

const mainPage = document.getElementById("main_page");
const createEditPage = document.getElementById("create-edit_page");

function toggleMainPage() {
  if (mainPage.classList.contains(CLOSE_CLASSNAME)) {
    mainPage.classList.remove(CLOSE_CLASSNAME);
  }
  if (createEditPage.classList.contains(OPEN_CLASSNAME)) {
    createEditPage.classList.remove(OPEN_CLASSNAME);
  }
}

function toggleCreateEditPage() {
  if (!mainPage.classList.contains(CLOSE_CLASSNAME)) {
    mainPage.classList.add(CLOSE_CLASSNAME);
  }
  if (!createEditPage.classList.contains(OPEN_CLASSNAME)) {
    createEditPage.classList.add(OPEN_CLASSNAME);
  }
}
