import ProductData from './productData.js';

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
        const template = document.getElementById('product-card-template');
        list.forEach(product => {
          const clone = template.content.cloneNode(true);
          const hydratedTemplate = this.prepareTemplate(clone, product);
          this.listElement.appendChild(hydratedTemplate);
        })
      }
      prepareTemplate(template, product) {
    
        template.querySelector('a').href +=  product.Id;
        template.querySelector('.product-card>img').src = this.product.Image;

        // fill in the rest of the data here... 
        return template;
      }

    } 
