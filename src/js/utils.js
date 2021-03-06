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
   currentItem.Quantity = currentItem.Quantity + 1;
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
  //document.getElementById("addToCart").addEventListener("click", getSuperscript());
}
/*function getSuperscript() {
  const cartItems = getLocalStorage("so-cart");
  const iconSuper = cartItems.length;
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        qs(".cartSuper").innerHTML = iconSuper;
      }
    }
    xhttp.open("GET", iconSuper, true);
    xhttp.send();
  };
*/
export function getCartTotals(array) {
  let subtotal = 0;
  for (var i = 0; i < array.length; i++) {
    subtotal += array[i].FinalPrice*array[i].Quantity;
  }
  return subtotal;
}


export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `<p>${message}</p><span>X</span>`;
  
  alert.addEventListener('click', function(e) {
      if(e.target.tagName == 'SPAN') {
        main.removeChild(this);
      }
  })
  const main = document.querySelector('main');
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if(scroll)
    window.scrollTo(0,0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => document.querySelector('main').removeChild(alert));
}