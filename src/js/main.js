import ProductData from "./productData.js";
import ProductList from "./productList";

const listElement = document.querySelector(".product-list");
const dataSource = new ProductData("tents");
const products = new ProductList("tents", dataSource, listElement);
products.init();
