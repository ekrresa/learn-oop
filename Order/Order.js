var db = require("../database");

function Order() {
  var now = new Date();

  this.date = now.toDateString();
  this.time = now.toTimeString().split(" ")[0];
  this.id = db.orders.length > 0 ? db.orders[db.orders.length - 1].id + 1 : 1;
}

// Make a new order
Order.createOrder = function() {
  return new Order();
};

// Get all orders
Order.readAll = function() {
  return db.orders;
};

// Read order by order ID
Order.readOne = function(id) {
  if (db.orders[id]) {
    var foundOrder = db.orders[id];
    return foundOrder;
  }
  return false;
};

//Edit Order (Only products are editable)
Order.update = function(id, prop, info) {
  var foundOrder = Order.prototype.readOne(id);

  if (foundOrder && foundOrder.hasOwnProperty(prop)) {
    if (prop === "products") {
      foundOrder[prop] = info;
      return foundOrder;
    }
    return "Only products can be edited";
  }
  return false;
};

// Find and delete order
Order.deleteOne = function(id) {
  var foundOrder = Order.prototype.readOne(id);

  if (foundOrder) {
    db.orders.splice(foundOrder.id, 1);
    return true;
  }

  return false;
};

// Empty Order Array
Order.deleteAll = function() {
  db.orders.length = 0;
};

module.exports = Order;
