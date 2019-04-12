var db = require("../database");
var User = require("./user");
var Order = require("../Order/order");

function Admin(name, email, password) {
  User.call(this, name, email, password);
  this.isAdmin = true;
  db.usersDB[this.id].isAdmin = this.isAdmin;
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

Admin.prototype.readAllUsers = function() {
  var userArray = [];
  var len = db.usersDB.length;

  for (var i = 0; i < len; i++) {
    userArray.push(db.usersDB[i]);
  }
  console.log("Users read successfully", userArray);

  return userArray;
};

Admin.prototype.deleteUser = function(name) {
  console.log(this.isAdmin);

  var len = db.usersDB.length;

  for (var i = 0; i < len; i++) {
    if (db.usersDB[i].name === name) {
      db.usersDB.splice(i, 1);
      console.log("User deleted");
      break;
    }
  }
  return name + " has been deleted";
};

Admin.prototype.deleteAllUsers = function() {
  db.usersDB.length = 0;
  console.log("All users deleted");

  return "All users deleted";
};

Admin.prototype.readAllOrders = function() {
  console.log("Reading orders...");
  var orderArray = Order.prototype.readAll();
  return orderArray;
};

Admin.prototype.readOneOrder = function(id) {
  console.log("Reading...");

  var foundOrder = Order.prototype.readOne(id);
  console.log("Order found");
  return foundOrder;
};

Admin.prototype.editOrder = function(id, prop, info) {
  var newOrder = Order.prototype.update(id, prop, info);
  console.log(newOrder);
};

Admin.prototype.deleteOrder = function(id) {
  var foundOrder = Order.prototype.deleteOne(id);
  if (foundOrder) {
    console.log("Order deleted");
    return;
  }
  return console.log("Order not found");
};

Admin.prototype.deleteAllOrders = function() {
  Order.prototype.deleteAll();
  return console.log("Order DB emptied");
};

module.exports = Admin;
