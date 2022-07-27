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

  };
  CARTROWS = {};
  updateCartTotal();
}
function removeCartItem(event, title) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  delete CARTROWS[title]
  updateCartTotal();
}

function quantityChanged(event, title) {
  console.log(CARTROWS);

  console.log(title);

  const input = event.target;
  let value = input.valueAsNumber;
if (isNaN(value) || value <= 0){
  value = 1;
  input.value = value;
}
CARTROWS[title].quantity = value;


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
let CARTROWS = {};

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
  CARTROWS[title] = {price: parseFloat(price.replace('£', '')), quantity: 1};
  const inputElement = document.createElement('input');
  inputElement.className = "cart-quantity-input"; 
  inputElement.type = "number";
  inputElement.value = 1;
  inputElement.addEventListener('change', (event) => quantityChanged(event, title))

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

cartRow.innerHTML = cartRowContents;
cartRow.appendChild(buttonContainer)
  cartItems.append(cartRow);
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', (event) => removeCartItem(event, title));
}

function updateCartTotal() {
  // console.log(CARTROWS)
  let totalItems = 0;

  
  let total = 0;
  Object.values(CARTROWS).forEach((row) => {
    total += row.price * row.quantity;
    totalItems += row.quantity;
  }) 

  let totalString = (Math.round(total * 100) / 100).toString();
  const positionAfterDot = totalString.split('.')[1]?.length;
    if (!positionAfterDot) {
      totalString += ".00"
    } else if (positionAfterDot === 1) {
      totalString += "0"
    };
    
  document.getElementsByClassName('cart-total-price')[0].innerText = '£' + totalString;
  document.getElementsByClassName('cart-total-items')[0].innerText = totalItems;
}


