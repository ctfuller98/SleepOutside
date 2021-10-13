import { getLocalStorage , loadHeaderFooter } from "./utils.js";
import CartList from "./cartList.js";

/*function getCartContents() {
  let markup = "";
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    const htmlItems = cartItems.map((item) => renderCartItem(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    document.querySelector(".subtotal").innerHTML =
      "Subtotal: " + getCartTotals(cartItems);
  }
}
function getCartTotals(array) {
  let subtotal = 0;
  for (var i = 0; i < array.length; i++) {
    subtotal += array[i].FinalPrice;
  }
  return subtotal;
}

/*function renderCartItem(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  return newItem;
}*/

loadHeaderFooter();
const cart = new CartList("so-cart", document.querySelector(".product-list"))
cart.init()



