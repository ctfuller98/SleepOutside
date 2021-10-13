import ProductData from "./productData.js";
import ProductList from "./productList";
import { loadHeaderFooter } from "./utils.js";

const listElement = document.querySelector(".product-list");
const dataSource = new ProductData("tents");
const products = new ProductList("tents", dataSource, listElement);
products.init();
loadHeaderFooter();
