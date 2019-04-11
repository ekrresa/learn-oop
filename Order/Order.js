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
  }
};

module.exports = Order;
