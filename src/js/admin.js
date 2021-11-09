import ExternalServices from "./externalServices.js"
import { alertMessage } from "./utils.js";
export default class Admin {
    constructor(outputSelector) {
        this.token = null;
        this.services = new ExternalServices();
      }
      async login(next) {
        const email = document.querySelector('#email').value
        const password = document.querySelector('#password').value

        // I built the login method with a callback: next. 
        // This makes it much more flexible...
        // there could be many different things the user wants to do after logging in...
        // this allows us that flexibility without having to write a bunch of login methods
        try {
          this.token = await this.services.loginRequest({email, password});
          next()
        } 
        catch(err) {
          // remember this from before?
          alertMessage(err.message.message);
        }
      }
      async printOrders(){
          try {
              const orders = await this.services.orderRequest(this.token)
              console.log(this.token)
              document.querySelector("main").innerHTML =
              `<h2>Current Orders</h2>
              <table id="orders">
              <thead>
              <tr><th>Id</th><th>Date</th><th>#Items</th><th>Total</th>
              </thead>
              <tbody class="order-body"></tbody>
              </table>
              `
              const parent = document.querySelector('#orders tbody');
              parent.innerHTML = orders.map(order=> `<tr><td>${order.id}</td><td>${new Date(order.orderDate).toLocaleDateString('en-US')}</td><td>${order.items.length}</td><td>${order.orderTotal}</td></tr>`).join('');
          }
          catch(err) {
            console.log(err);
          }
      }
    showLogin(){ 
        document.querySelector("main").innerHTML = `
        <form id="adminForm">
        <fieldset>
          <legend>Admin Login</legend>
          <p>
            <label for="email">Email</label>
            <input name="email" id="email" type="email" value="user1@email.com" required/>
          </p>
          <p>
            <label for="password">Password</label>
            <input name="password"id="password" type="password" required />
          </p>
         </fieldset>
        <button type="submit">Login</button>
      </form>`
      document
  .querySelector("#adminForm")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    this.login()
    this.printOrders()}
    );
}
}
const myAdmin = new Admin("main");
myAdmin.showLogin();
