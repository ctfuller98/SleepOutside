// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
function convertToText(res) {
  if (res.ok) {
    return res.text();
  } else {
    throw new Error("Bad Response");
  }
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  let currentCart = getLocalStorage(key);
  if (!currentCart) {
    currentCart = [];
    currentCart.push(data);
    //console.log("inside first")
  }
  else
  { 
  let isMatching = false;
  currentCart.forEach(item => {
    if(item.Id == data.Id)
    {
      isMatching = true;
    }
  })
  if(isMatching)
  {
   let currentItem = currentCart.find(item => item.Id == data.Id);
   currentItem.Quatity = currentItem.Quatity + 1;
  }
  else{
    currentCart.push(data);
  }
  //console.log(currentCart)
  }
  localStorage.setItem(key, JSON.stringify(currentCart));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// gets parameters for products details
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}
export function renderListWithTemplate(template, parent, list, callback) {
  list.forEach((element) => {
    const clone = template.content.cloneNode(true);
    const templateWithData = callback(clone, element);
    parent.appendChild(templateWithData);
  });
}
export function renderWithTemplate(template, parent, data, callback) {
  let clone = template.content.cloneNode(true);
  if (callback) {
    clone = callback(clone, data);
  }
  parent.appendChild(clone);
}
export async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}
export async function loadHeaderFooter() {
  const header = await loadTemplate("../partials/header.html");
  const footer = await loadTemplate("../partials/footer.html");
  let headerE = qs(".header");
  let footerE = qs(".footer");
  renderWithTemplate(header, headerE);
  renderWithTemplate(footer, footerE);
  getSuperscript();
}
function getSuperscript() {
  const cartItems = getLocalStorage("so-cart");
  const iconSuper = cartItems.length;
  qs(".cartSuper").innerHTML = iconSuper;
}
