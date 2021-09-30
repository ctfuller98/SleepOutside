import { setLocalStorage } from './utils.js';

export default class ProductDetails {
      constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
      }

      async init(){
        this.product = await this.dataSource.findProductById(this.productId);
        document.querySelector('main').innerHTML = this.renderProductDetails();
            document.getElementById('addToCart')
                 .addEventListener('click', this.addToCart.bind(this));
      }
        // add to cart button event handler
      addToCart() {        
        setLocalStorage('so-cart', product);
      }
  
      renderProductDetails() {
        const newItem = `<h3>${item.Brand.Name}</h3> 
        <h2 class="divider">${item.NameWithoutBrand}</h2> <!-- Custom-->
        <img
          class="divider"
          src="${item.Image}"
          alt="${item.NameWithoutBrand}"
        /> <!-- Custom-->

        <p class="product-card__price">${item.ListPrice}</p> <!-- Custom-->
        <p class="product__color">${item.Colors[1]}</p> <!-- Custom-->
        <p class="product__description">${item.DescriptionHtmlSimple}</p> <!-- Custom-->`;
            console.log(newItem);
            return newItem;
          }
    }