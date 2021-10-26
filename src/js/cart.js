import { getLocalStorage, loadHeaderFooter, getGartTotals } from "./utils.js";
import CartList from "./cartList.js";

function getCartContents() {
  let markup = "";
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    document.querySelector(".subtotal").innerHTML =
      "Subtotal: " + getCartTotals(cartItems);
  }
}



loadHeaderFooter();
const cart = new CartList("so-cart", document.querySelector(".product-list"));
cart.init();
getCartContents();

/*function removeFromCart() {
  let cartItems = getLocalStorage("so-cart");
  let index = 0;
  let itemId = "880RR"
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

}*/
