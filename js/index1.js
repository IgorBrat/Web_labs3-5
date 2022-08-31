// Dom utils functions

const typeInput = document.getElementById("type_input");
const priceInput = document.getElementById("price_input");
const brandInput = document.getElementById("brand_input");
const dateInput = document.getElementById("date_input");
const typeEdit = document.getElementById("type_edit");
const priceEdit = document.getElementById("price_edit");
const brandEdit = document.getElementById("brand_edit");
const dateEdit = document.getElementById("date_edit");
const itemsContainer = document.getElementById("goods_list");
const priceContainer = document.getElementById("counted_price");

const itemTemplate = ({id, type, price, brand, date}) => `
<li id="${id}" class="item">
  <div class="card">
    <h4 class="card-type">Name: ${type}</h4>
    <h4 class="card-price">Price: ${price}$</h4>
    <h4 class="card-brand">Brand: ${brand}</h4>
    <h4 class="card-production-date">Date: ${date}</h4>
    <button id="edit_btn${id}" type="button" class="btn-primary edit-btn" onclick="editFunc(${id})">
      Edit
    </button>
  </div>
</li>`;

const priceTemplate = (price) => `
<span>Total price: ${price.toFixed(2)}$</span>
`;

const clearInputs = () => {
  typeInput.value = "";
  priceInput.value = "";
  brandInput.value = "";
  dateInput.value = "";
};

const clearEdits = () => {
 typeEdit.value = "";
 priceEdit.value = "";
 brandEdit.value = "";
 dateEdit.value = "";
};

const validateValues = ({type, price, brand, date}) => {
  if (!type || !price || !brand || !date) {
    toggleModal();
    return false;
  }
  return true;
}

const addItemToPage = ({ id, type, price, brand, date }) => {
  itemsContainer.insertAdjacentHTML(
    "beforeend",
    itemTemplate({ id, type, price, brand, date })
  );
};

const renderItemsList = (items) => {
  itemsContainer.innerHTML = "";
  for (const item of items) {
    addItemToPage(item);
  }
};

const addTotalPrice = (price) => {
  priceContainer.innerHTML = "";
  priceContainer.insertAdjacentHTML(
    "beforeend",
    priceTemplate(price)
  );
};

const getInputValues = () => {
  return {
    type: typeInput.value,
    price: priceInput.value,
    brand: brandInput.value,
    date: dateInput.value,
  };
};

const getEditValues = () => {
 return {
   type: typeEdit.value,
   price: priceEdit.value,
   brand: brandEdit.value,
   date: dateEdit.value,
 };
};


// Managing items

const submitButton = document.getElementById("submit_btn");
const editSubmitButton = document.getElementById("edit_submit_btn");
const searchButton = document.getElementById("search_btn");
const cancelSearchButton = document.getElementById("cancel_search_btn");
const searchInput = document.getElementById("search_input");
const countButton = document.getElementById("count_price_btn");
const sortCheckbox = document.getElementById("sort_items");

let items = [];
let id = 0;
let currId = -1;


const addItem = ({ type, price, brand, date }) => {
  const newItem = {
    id: id,
    type: type,
    price: price,
    brand: brand,
    date: date,
  };
  id += 1;
  items.push(newItem);
  addItemToPage(newItem);
}

submitButton.addEventListener("click", (event) => {
  // Prevents default page reload on submit
  event.preventDefault();
  const { type, price, brand, date } = getInputValues();
  let res = validateValues({ type, price, brand, date });
  if (res) {
    addItem({ type, price, brand, date });
    clearInputs();
    toggleMainPage();
  }
});

searchButton.addEventListener("click", () => {
  const foundItems = items.filter(
    (item) => item.brand.toLowerCase().search(searchInput.value.toLowerCase()) !== -1
  );

  renderItemsList(foundItems);
});

cancelSearchButton.addEventListener("click", () => {
  renderItemsList(items);
  searchInput.value = "";
});

countButton.addEventListener("click", () => {
  var price = Number('0');
  for (const item of items) {
    price += Number(item.price);
  }
  addTotalPrice(price);
});

sortCheckbox.addEventListener("change", function() {
  if (this.checked) {
    const tempItems = items.slice();
    tempItems.sort(function(a,b) {
      let keyA = Number(a.price),
        keyB = Number(b.price);
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    renderItemsList(tempItems);
  } else {
    renderItemsList(items);
  }
});

editSubmitButton.addEventListener("click", function() {
  event.preventDefault();
  const { type, price, brand, date } = getEditValues();
  let res = validateValues({ type, price, brand, date });
  if (res) {
    items[currId].type = type;
    items[currId].price = price;
    items[currId].brand = brand;
    items[currId].date = date;
    clearEdits();
    toggleEditPage();
    renderItemsList(items);
  }
});

function changeCurrId(id) {
  currId = id;
}

// Toggle functions

const CLOSE_CLASSNAME = "close";
const OPEN_CLASSNAME = "open";

const mainPage = document.getElementById("main_page");
const createPage = document.getElementById("create_page");
const editPage = document.getElementById("edit_page");
const modal = document.getElementById("modal");

const addForm = document.getElementById("add_form");
const editForm = document.getElementById("edit_form");


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

function toggleModal() {
  modal.classList.toggle(OPEN_CLASSNAME);
  if (createPage.classList.contains(OPEN_CLASSNAME)) {
    addForm.classList.toggle(CLOSE_CLASSNAME);
  }
  if (editPage.classList.contains(OPEN_CLASSNAME)) {
    editForm.classList.toggle(CLOSE_CLASSNAME);
  }
}


// Edit item onclick

function editFunc(clicked_id) {
  toggleEditPage();
  changeCurrId(clicked_id);
}
