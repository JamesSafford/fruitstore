if (document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready);
} else{
  ready()
}

function ready(){ 
const removeCartItemButtons = document.getElementsByClassName('btn-danger')
for (let i = 0; i < removeCartItemButtons.length; i++) {
  let button = removeCartItemButtons[i];
  button.addEventListener('click', removeCartItem);
  }

  const quantityInputs = document.getElementsByClassName('cart-quantity-input');
  for (let i = 0; i < quantityInputs.length; i++){
    let input = quantityInputs[i];
    input.addEventListener('change', (event) => quantityChanged(event, i));
  }

  const addToCartButtons = document.getElementsByClassName('shop-item-button');
  for (let i = 0; i< addToCartButtons.length; i++){
    let button = addToCartButtons[i];
    button.addEventListener('click', addToCartClick);
  }

  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
}

function purchaseClicked () {
  alert('Thanks for your purchase');
  const cartItems = document.getElementsByClassName('cart-items')[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}
function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event, index) {
  console.log(CARTROWS);

  console.log(index);

  const input = event.target;
if (isNaN(input.value) || input.value <= 0){
  input.value = 1;
}
CARTROWS[index].quantity = input;

updateCartTotal();

}

function addToCartClick(event) {
  const button = event.target;
  const shopItem = button.parentElement.parentElement;
  const title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
  const price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
  const imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;

  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}
const CARTROWS = [];

function addItemToCart(title, price, imageSrc) {
  const cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  const cartItems = document.getElementsByClassName('cart-items')[0];
  const cartItemNames = cartItems.getElementsByClassName('cart-item-title');
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert('You have already added this item to the cart');
      return;
    }
  }
  CARTROWS.push({price: parseFloat(price.replace('£', '')), quantity: 1});
  const index = CARTROWS.length - 1;
  const inputElement = document.createElement('input');
  inputElement.className = "cart-quantity-input"; 
  inputElement.type = "number";
  inputElement.value = 1;
  inputElement.addEventListener('change', (event) => quantityChanged(event, index))

  const cartRowContents = `
  <div class="cart-item cart-column">
  <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
  <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
`
const dangerButton = document.createElement("button");
dangerButton.classList.add("btn", "btn-danger");
dangerButton.innerText = "REMOVE";
const buttonContainer = document.createElement("div");
buttonContainer.classList.add("cart-quantity", "cart-column");
buttonContainer.appendChild(inputElement);
buttonContainer.appendChild(dangerButton);

{/* <div class="cart-quantity cart-column">
  <input class="cart-quantity-input" type="number" value="1">
  <button class="btn btn-danger" type="button">REMOVE</button>
</div> */}

cartRow.innerHTML = cartRowContents;
cartRow.appendChild(buttonContainer)
  cartItems.append(cartRow);
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

function updateCartTotal() {
  // console.log(CARTROWS)
  const totalItems = CARTROWS.length;
  let total = 0;
  CARTROWS.forEach((row) => {
    total += row.price * row.quantity;
  }) 
  // let total = CARTROWS.reduce((currentTotal, newItem) => currentTotal + newItem, 0)
  // const cartItemContainer = document.getElementsByClassName('cart-items')[0];
  // const cartRows = cartItemContainer.getElementsByClassName('cart-row');
  // let total = 0;
  // for (let i = 0; i < cartRows.length; i++) {
  //   const cartRow = cartRows[i];
  //   const priceElement = cartRow.getElementsByClassName('cart-price')[0];
  //   const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];

  //   const price = parseFloat(priceElement.innerText.replace('£', ''));
  //   const quantity = quantityElement.value;
  //   console.log(quantityElement.value);
  //   total = total + (price * quantity);
  //   totalItems = quantity;
  // }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('cart-total-price')[0].innerText = '£' + total;
  document.getElementsByClassName('cart-total-items')[0].innerText = totalItems;
}


