var db = require("../database");
var Order = require("../Order/Order");

// User constructor function
function User(name, email, password) {
  this.name = name;
  this.email = email;
  this.password = password;
  this.id = db.users.length > 0 ? db.users[db.users.length - 1].id + 1 : 1;

  // Save reference of user in database
  db.users.push(this);
}

User.prototype = {
  constructor: User,

  // Get User by ID
  getUser: function(id) {
    console.log("Getting user...");
    var len = db.users.length;
    for (let i = 0; i < len; i++) {
      if (db.users[i].id === id) {
        console.log("User found");
        return db.users[i];
      }
    }
    console.log("User does not exist");
    return "User does not exist";
  },

  // Edit User
  // TODO: argument should be an object for editing multiple properties
  updateUser: function(prop, info) {
    console.log("Updating...");
    if (prop === "id") {
      console.log("ID cannot be changed");
      return "Operation not allowed";
    } else if (this.hasOwnProperty(prop)) {
      this[prop] = info;
      return console.log(this.name + " info updated successfully!");
    }
    console.log("User property does not exist");
    return "User property does not exist";
  },

  // Get User by name
  searchUser: function(name) {
    for (const user of db.users) {
      if (user.name === name) {
        console.log("User found", user);
        return user;
      }
    }
    console.log("Person does not exist");
    return false;
  },

  // User makes an order
  makeOrder: function() {
    console.log("Ordering...");
    // Checks if products was passed in
    if (arguments.length === 0) {
      console.log("Order failed");
      return "Valid order needs products";
    }
    var newOrder = Order.createOrder();
    newOrder.user_id = this.id;
    // Converts arguments to array
    newOrder.products = Array.prototype.slice.call(arguments);
    db.orders.push(newOrder);
    console.log("User made an order");
    return newOrder;
  }
};

module.exports = User;
