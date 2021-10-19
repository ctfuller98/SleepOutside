const baseURL =  'http://157.201.228.93:2992/'

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
 
  }

  // get tents data
  getData(category) {
    return fetch(baseURL + `products/search/${category}`)
    .then(convertToJson).then((data) => data.Result);
  }

  async findProductById(id) {
    const products = await fetch(baseURL+`product/${id}`).then(convertToJson).then((data) => data.Result);
    console.log(id);
    console.log(baseURL+`product/${id}`)
    return products;
  }
}
