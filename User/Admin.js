var db = require("../database");
var User = require("./User");

function Admin(name, email, password) {
  User.call(this, name, email, password);
  db.usersDB[this.id].isAdmin = true;
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;
