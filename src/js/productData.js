


export default class ProductData {

  constructor(catagory){
    this.catagory = catagory;
    this.path = `../json${this.catagory}.json`;
  }

  convertToJson(res) {
    if (res.ok) {
      return res.json(); 
    } else {
      throw new Error('Bad Response');
    }
  }
  

// get tents data
  getData() {
    return fetch(this.path)
      .then(convertToJson).then((data) => data);
  }

  async findProductByID(id){
        const products = await this.getProductsData()
        return products.find((item) => item.Id === id);

     }
    

}




