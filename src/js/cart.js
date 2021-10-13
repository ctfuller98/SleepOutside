function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function getCartContents() {
  let markup = "";
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    const htmlItems = cartItems.map((item) => renderCartItem(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    document.querySelector(".subtotal").innerHTML =
      "Subtotal: " + getCartTotals(cartItems);
  }

  // document.querySelector(".product-list").innerHTML = renderCartItem(cartItems);
}
function getCartTotals(array) {
  let subtotal = 0;
  for (var i = 0; i < array.length; i++) {
    subtotal += array[i].FinalPrice;
  }
  return subtotal;
}

function renderCartItem(item) {
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
  <p class="cart-card__price">$${item.FinalPrice}
  <span id="removeFromCart" onclick="removeFromCart('${item.Id}')" >Remove</span></p>
  
</li>`;
  return newItem;
}

function removeFromCart(itemId){
  let cartItems = getLocalStorage("so-cart");
  let index = 0;
  //write a loop to search through the cartItems[], 
  //return the item with the index pointing at the item with the itemId
  for (let i = 0; i < cartItems.length; i++) {
    if(cartItems[i].Id == itemId)
      {
        index = i;
      }
  }
  cartItems.splice(index,1);
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  getCartContents();

}

getCartContents();
