import { setLocalStorage } from "./utils.js";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    document.querySelector("main").innerHTML = this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }
  // add to cart button event handler
  addToCart() {
    this.product.Quatity = 1;
    setLocalStorage("so-cart", this.product);
  }

  renderProductDetails() {
    const newItem = `<section class="product-detail"> <h3>${this.product.Brand.Name}</h3> 
        <h2 class="divider">${this.product.NameWithoutBrand}</h2> <!-- Custom-->
        <img
          class="divider"
          src="${this.product.Images.PrimaryLarge}"
          alt="${this.product.NameWithoutBrand}"
        /> <!-- Custom-->

        <p class="product-card__price">${this.product.ListPrice}</p> <!-- Custom-->
        <p class="product__color">${this.product.Colors[0].ColorName}</p> <!-- Custom-->
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p> <!-- Custom-->
        <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div></section>`;
    return newItem;
  }
}
