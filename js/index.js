import {
  EDIT_BUTTON_PREFIX,
  DELETE_BUTTON_PREFIX,
  addItemToPage,
  clearInputs,
  renderItemsList,
  getInputValues,
  addTotalPrice,
  validateValues,
} from "./dom_utils.js";

import {
  getAllItems,
  postItem,
  updateItem,
  deleteItem,
} from "./api.js";

const submitButton = document.getElementById("submit_btn");
const searchButton = document.getElementById("search_btn");
const cancelSearchButton = document.getElementById("cancel_search_btn");
const searchInput = document.getElementById("search_input");
const countButton = document.getElementById("count_price_btn");
const sortCheckbox = document.getElementById("sort_items");

let items = [];

const onEditItem = async (element) => {
  const itemId = element.target.id.replace(EDIT_BUTTON_PREFIX, "");
  const { type, price, brand, date } = getInputValues();
  let res = validateValues({ type, price, brand, date });
  if (res) {
    await updateItem(itemId, { type, price, brand, date });
    clearInputs();
    refetchAllItems();
  }
};

const onDeleteItem = async (element) => {
  const itemId = element.target.id.replace(DELETE_BUTTON_PREFIX, "");
  await deleteItem(itemId).then(refetchAllItems);
};

const refetchAllItems = async () => {
  const allItems = await getAllItems();
  items = allItems;
  renderItemsList(items, onEditItem, onDeleteItem);
};

submitButton.addEventListener("click", (event) => {
  const { type, price, brand, date } = getInputValues();
  let res = validateValues({ type, price, brand, date });
  if (res) {
    clearInputs();
    postItem({
      type,
      price,
      brand,
      date,
    });
    refetchAllItems();
  }
});

searchButton.addEventListener("click", () => {
  const foundItems = items.filter(
    (item) => item.brand.toLowerCase().search(searchInput.value.toLowerCase()) !== -1
  );
  renderItemsList(foundItems, onEditItem, onDeleteItem);
});

cancelSearchButton.addEventListener("click", () => {
  renderItemsList(items, onEditItem, onDeleteItem);
  searchInput.value = "";
});

countButton.addEventListener("click", () => {
  let price = Number('0');
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
    renderItemsList(tempItems, onEditItem, onDeleteItem);
  } else {
    renderItemsList(items, onEditItem, onDeleteItem);
  }
});

// Refresh page:
refetchAllItems();
