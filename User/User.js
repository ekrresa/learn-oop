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
    console.log("The ID of " + this.name + " is " + db.usersDB[this.id].id);
    return db.usersDB[this.id];
  },
  updateUser: function(prop, info) {
    if (this.hasOwnProperty(prop)) {
      this[prop] = info;
      return console.log(this.name + "info updated successfully!");
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
    var newOrder = new Order();
    newOrder.user_id = this.id;
    newOrder.products = Array.prototype.slice.call(arguments);
    db.ordersDB.push(newOrder);
    console.log("User made an order");
    return newOrder;
  }
};

// var felix = new User("Felix", "felix@gmail.com", "fudge");
// var mike = new User("Mike", "mike@gmail.com", "ross");
// felix.makeOrder("rice", "beans");
// mike.makeOrder("rice", "indomie");
// felix.makeOrder("onions", "beans", "beer");
// console.log(db.ordersDB);

module.exports = User;
