var db = require("../database");
var User = require("./user");

function Admin(name, email, password) {
  User.call(this, name, email, password);
  this.isAdmin = true;
  db.usersDB[this.id].isAdmin = this.isAdmin;
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

module.exports = Admin;
