const CLOSE_CLASSNAME = "close";
const OPEN_CLASSNAME = "open";

const mainPage = document.getElementById("main_page");
const createPage = document.getElementById("create_page");
const editPage = document.getElementById("edit_page");

function toggleMainPage() {
  if (mainPage.classList.contains(CLOSE_CLASSNAME)) {
    mainPage.classList.remove(CLOSE_CLASSNAME);
  }
  if (createPage.classList.contains(OPEN_CLASSNAME)) {
    createPage.classList.remove(OPEN_CLASSNAME);
  }
}

function toggleCreatePage() {
  if (!mainPage.classList.contains(CLOSE_CLASSNAME)) {
    mainPage.classList.add(CLOSE_CLASSNAME);
  }
  if (!createPage.classList.contains(OPEN_CLASSNAME)) {
    createPage.classList.add(OPEN_CLASSNAME);
  }
}

function toggleEditPage() {
  mainPage.classList.toggle(CLOSE_CLASSNAME);
  editPage.classList.toggle(OPEN_CLASSNAME);
}
