import { getLocalStorage, loadHeaderFooter } from "./utils.js";
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
*/

loadHeaderFooter();
const cart = new CartList("so-cart", document.querySelector(".product-list"));
cart.init();

function removeFromCart(itemId) {
  let cartItems = getLocalStorage("so-cart");
  let index = 0;
  //write a loop to search through the cartItems[],
  //return the item with the index pointing at the item with the itemId
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].Id == itemId) {
      index = i;
    }
  }
  cartItems.splice(index, 1);
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  cart.init();

}
