var db = require("../database");
var Order = require("../Order/order");

function User(name, email, password) {
  this.name = name;
  this.email = email;
  this.password = password;
  this.id = db.usersDB.length;

  var person = {
    id: this.id,
    name: this.name,
    email: this.email,
    password: this.password
  };

  db.usersDB.push(person);
}

User.prototype = {
  constructor: User,
  getUser: function(id) {
    console.log("Getting user...");
    if (db.usersDB[id]) {
      console.log("User found");
      return db.usersDB[this.id];
    }
    console.log("User does not exist");
    return "User does not exist";
  },
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
  searchUser: function(name) {
    for (const user of db.usersDB) {
      if (user.name === name) {
        console.log("User found", user);
        return user;
      }
    }
    console.log("Person does not exist");
    return false;
  },
  makeOrder: function() {
    console.log("Ordering...");
    if (arguments.length === 0) {
      console.log("Order failed");
      return "Valid order needs products";
    }
    var newOrder = new Order();
    newOrder.user_id = this.id;
    newOrder.products = Array.prototype.slice.call(arguments);
    db.ordersDB.push(newOrder);
    console.log("User made an order");
    return newOrder;
  }
};

module.exports = User;
