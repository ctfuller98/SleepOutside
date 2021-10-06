import { renderListWithTemplate } from "./utils.js";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData();
    // render the list
    this.renderList(list);
  }
  renderList(list) {
    // make sure the list is empty
    this.listElement.innerHTML = "";
    //get the template
    const template = document.getElementById("product-card-template");
    const PricedList = list.filter(
      (item) => item.FinalPrice < 200 && item.FinalPrice > 177
    );
    renderListWithTemplate(
      template,
      this.listElement,
      PricedList,
      this.prepareTemplate
    );
  }
  prepareTemplate(template, product) {
    template.querySelector("a").href += product.Id;
    template.querySelector("img").src = product.Image;
    template.querySelector("img").alt += product.NameWithoutBrand;
    template.querySelector(".card_brand").textContent = product.Brand.Name;
    template.querySelector(".card_name").textContent = product.NameWithoutBrand;
    template.querySelector(".product-card_price").textContent +=
      product.FinalPrice;
    return template;
  }
}
