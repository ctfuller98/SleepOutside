import {
  getCartTotals,
  getLocalStorage,
  qs,
  loadHeaderFooter,
} from "./utils.js";
import ExternalServices from "./externalServices.js";
let cartItems = getLocalStorage("so-cart");
let totalQuantity = 0; 
for (let i = 0; i < cartItems.length; i++) {
  totalQuantity = totalQuantity + cartItems[i].Quantity;
}
let subtotal = getCartTotals(cartItems);
let tax = 0.06 * subtotal;
let shipping = 10 + (totalQuantity - 1) * 2;
let total = subtotal + tax + shipping;
const services = new ExternalServices();
function print_checkout() {
  qs(
    ".checkoutsub"
  ).innerHTML = `Item Subtotal(${totalQuantity}):   $${subtotal}`;
  qs(".tax").innerHTML = `Tax: $${tax.toFixed(2)}`;
  qs(".shipping").innerHTML = `Shipping Estimate: $${shipping}`;
  qs(".orderTotal").innerHTML = `<b>Order Total</b>: ${total.toFixed(2)} `;
}
async function handleSubmit(e) {
  // we don't want the form to reload the page...so we call preventDefault
  e.preventDefault();
  var myForm = e.target;
  // convert the form into a js object.
  const data = formDataToJSON(myForm);
  data.orderTotal = total;
  data.shipping = shipping;
  data.tax = tax;
  var newCart = cartItems.map((item) => ({
    Id: item.Id,
    Name: item.Name,
    Price: item.FinalPrice,
  }));
  data.cart = newCart;
  data.orderDate = new Date();
  data.expiration = `${data.expireMM}/${data.expireYY}`;
  try {
    const res = await services.checkout(data);
    console.log(res);
  } catch (err) {
    console.log(err);
  }

}
function formDataToJSON(formElement) {
  let formData = new FormData(formElement);
  // Object.fromEntries creates a new object made from an iterable list like an Array or Map
  // Object.entries takes an object and converts it into an Array that is iterable.
  const converted = Object.fromEntries(formData.entries());
  return converted;
}
loadHeaderFooter();
print_checkout();
document
  .querySelector("#checkoutForm")
  .addEventListener("submit", handleSubmit);
