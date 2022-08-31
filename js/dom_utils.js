const titleInput = document.getElementById("title_input");
const priceInput = document.getElementById("price_input");
const brandInput = document.getElementById("brand_input");
const itemsContainer = document.getElementById("goods_list");
const priceContainer = document.getElementById("counted_price");

const itemTemplate = ({id, title, price, brand}) => `
<li id="${id}" class="item">
  <div class="card">
    <h4 class="card-title">Name: ${title}</h4>
    <h4 class="card-price">Price: ${price}$</h4>
    <h4 class="card-price">Brand: ${brand}</h4>
    <button id="edit_btn${id}" type="button" class="btn-primary edit-btn">
      Edit
    </button>
  </div>
</li>`;

// onclick="editFunc(${id})"

const priceTemplate = (price) => `
<span>Total price: ${price}$</span>
`;

let id = 0;

export const clearInputs = () => {
  titleInput.value = "";
  priceInput.value = "";
  brandInput.value = "";
};

export const addItemToPage = ({ id, title, price, brand }) => {
  itemsContainer.insertAdjacentHTML(
    "beforeend",
    itemTemplate({ id, title, price, brand })
  );
  id += 1;
};

export const renderItemsList = (items) => {
  itemsContainer.innerHTML = "";
  for (const item of items) {
    addItemToPage(item);
  }
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
    title: titleInput.value,
    price: priceInput.value,
    brand: brandInput.value,
  };
};
