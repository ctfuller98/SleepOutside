import ExternalServices from "./externalServices.js";
import ProductDetails from "./productDetails.js";
import { getParam } from "./utils.js";
import { loadHeaderFooter } from "./utils.js";

const dataSource = new ExternalServices("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();
loadHeaderFooter();

/*

let products = [];

// add to cart button event handler
function addToCart(e) {
  const product = products.find((item) => item.Id === e.target.dataset.id);
  setLocalStorage('so-cart', product);
}

getData();
// add listener to Add to Cart button
document.getElementById('addToCart').addEventListener('click', addToCart);
/*
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// get tents data
function getProductsData() {
  fetch('../json/tents.json')
    .then(convertToJson)
    .then((data) => {
      products = data;
    });
}
// or should we do it this way?
// async function getProductsDataAwait() {
//   products = await fetch("../json/tents.json").then(convertToJson);
// }
*/
