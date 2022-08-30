import {
  clearInputs,
  addItemToPage,
  renderItemsList,
  getInputValues,
  addTotalPrice,
} from "./dom_utils.js";

const submitButton = document.getElementById("submit_btn");
const searchButton = document.getElementById("search_btn");
const cancelSearchButton = document.getElementById("cancel_search_btn");
const searchInput = document.getElementById("search_input");
const countButton = document.getElementById("count_price_btn");
const sortCheckbox = document.getElementById("sort_items");


let items = [];
let id = 0;

const addItem = ({ title, price, brand }) => {
  const newItem = {
    id: id,
    title: title,
    price: price,
    brand: brand,
  };
  id += 1;
  items.push(newItem);
  addItemToPage(newItem);
}

submitButton.addEventListener("click", (event) => {
  // Prevents default page reload on submit
  event.preventDefault();

  const { title, price, brand } = getInputValues();

  addItem({ title, price, brand });

  clearInputs();

});

searchButton.addEventListener("click", () => {
  const foundItems = items.filter(
    (item) => item.title.search(searchInput.value) !== -1
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
