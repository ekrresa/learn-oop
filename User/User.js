var db = require("../database");

function User(name, email, password) {
  this.name = name;
  this.email = email;
  this.password = password;
  this.id = db.usersDB.length;

  var self = this;

  function createUser() {
    var person = {
      id: self.id,
      name: self.name,
      email: self.email,
      password: self.password
    };

    db.usersDB.push(person);
  }
  createUser();
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
  }
};

module.exports = User;
