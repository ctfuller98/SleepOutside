const baseURL = "http://157.201.228.93:2992/";

function convertToJson(res) {
  const jsonResponse = res.json()
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor() {}

  // get tents data
  getData(category) {
    return fetch(baseURL + `products/search/${category}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }
  async checkout(order) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }

  async findProductById(id) {
    const products = await fetch(baseURL + `product/${id}`)
      .then(convertToJson)
      .then((data) => data.Result);
    console.log(id);
    console.log(baseURL + `product/${id}`);
    return products;
  }
  async loginRequest(user) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }
    const response = await fetch(baseURL + 'login', options).then(convertToJson);
    return response.accessToken;
  }
  // make a request to the server for the current orders
  // requires: a valid token
  // returns: a list of orders
  async getOrders(token) {
    const options = {
      method: 'GET',
      // the server will reject our request if we don't include the Authorization header with a valid token!
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    const response = await fetch(baseURL + 'checkout/', options).then(convertToJson);
    return response;
  }
}

