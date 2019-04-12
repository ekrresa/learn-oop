var db = require("../database");

function Order() {
  var now = new Date();

  this.date = now.toDateString();
  this.time = now.toTimeString().split(" ")[0];
  this.id = db.ordersDB.length;
  // this.products = Array.prototype.slice.call(arguments);
}

Order.prototype = {
  constructor: Order,
  createOrder: function() {
    return new Order();
  },
  readAll: function() {
    return db.ordersDB;
  },
  readOne: function(id) {
    var len = db.ordersDB.length;
    for (var i = 0; i < len; i++) {
      if (db.ordersDB[i].id === id) {
        var foundOrder = db.ordersDB[i];
      }
    }
    return foundOrder;
  },
  update: function(id, prop, info) {
    var foundOrder = Order.prototype.readOne(id);
    if (foundOrder.hasOwnProperty(prop)) {
      foundOrder[prop] = info;
    }
    return foundOrder;
  },
  deleteOne: function(id) {
    var len = db.ordersDB.length;

    for (var i = 0; i < len; i++) {
      if (db.ordersDB[i].id === id) {
        var foundOrder = db.ordersDB.splice(i, 1);
        break;
      }
    }
    return foundOrder;
  },
  deleteAll: function() {
    db.ordersDB.length = 0;
  }
};

module.exports = Order;
