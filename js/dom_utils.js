export const EDIT_BUTTON_PREFIX = 'edit_btn';
export const DELETE_BUTTON_PREFIX = 'delete_btn';

const typeInput = document.getElementById("type_input");
const priceInput = document.getElementById("price_input");
const brandInput = document.getElementById("brand_input");
const dateInput = document.getElementById("date_input");
const itemsContainer = document.getElementById("goods_list");
const priceContainer = document.getElementById("counted_price");

const itemTemplate = ({id, type, price, brand, date}) => `
<li id="${id}" class="item">
  <div class="card">
    <h4 class="card-type">Name: ${type}</h4>
    <h4 class="card-price">Price: ${price.toFixed(2)}$</h4>
    <h4 class="card-brand">Brand: ${brand}</h4>
    <h4 class="card-production-date">Date: ${date}</h4>
    <button id="${EDIT_BUTTON_PREFIX}${id}" type="button" class="btn-primary edit-btn">
      Edit
    </button>
    <button id="${DELETE_BUTTON_PREFIX}${id}" type="button" class="btn-secondary delete-btn"">
      Delete
    </button>
  </div>
</li>`;

const priceTemplate = (price) => `
<span>Total price: ${price.toFixed(2)}$</span>
`;

export const clearInputs = () => {
  typeInput.value = "";
  priceInput.value = "";
  brandInput.value = "";
  dateInput.value = "";
};

export const validateValues = ({type, price, brand, date}) => {
  if (!type || !price || !brand || !date) {
    alert("Check if ypur inputs are not empty");
    return false;
  }
  return true;
}

export const addItemToPage = ({ id, type, price, brand, date }, onEditItem, onDeleteItem) => {
  price = Number(price);
  itemsContainer.insertAdjacentHTML(
    "beforeend",
    itemTemplate({ id, type, price, brand, date })
  );
  const element = document.getElementById(id);
  const editButton = document.getElementById(`${EDIT_BUTTON_PREFIX}${id}`);
  const deleteButton = document.getElementById(`${DELETE_BUTTON_PREFIX}${id}`);
  editButton.addEventListener("click", onEditItem);
  deleteButton.addEventListener("click", onDeleteItem);
};

export const renderItemsList = (items, onEditItem, onDeleteItem) => {
  itemsContainer.innerHTML = "";
  for (const item of items) {
    addItemToPage(item, onEditItem, onDeleteItem);
  };
};

export const addTotalPrice = (price) => {
  priceContainer.innerHTML = "";
  priceContainer.insertAdjacentHTML(
    "beforeend",
    priceTemplate(price)
  );
};

export const getInputValues = () => {
  return {
    type: typeInput.value,
    price: priceInput.value,
    brand: brandInput.value,
    date: dateInput.value,
  };
};
