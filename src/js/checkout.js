
import { getCartTotals, getLocalStorage, qs, loadHeaderFooter } from "./utils.js";
function checkout(){
    const cartItems = getLocalStorage('so-cart')
    const subtotal = getCartTotals(cartItems)
    const tax = 0.06*subtotal
    const shipping = 10+((cartItems.length -1)*2)
    const total = subtotal+tax+shipping
    qs(".checkoutsub").innerHTML = `Item Subtotal(${cartItems.length}):   $${subtotal}`
    qs(".tax").innerHTML = `Tax: $${tax.toFixed(2)}`
    qs(".shipping").innerHTML = `Shipping Estimate: $${shipping}`
    qs(".orderTotal").innerHTML = `<b>Order Total</b>: ${total.toFixed(2)} `
}
loadHeaderFooter();
checkout();
