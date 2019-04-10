var db = require("../database");

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
    console.log("The ID of " + this.name + "is" + db.usersDB[this.id]);
    return db.usersDB[this.id];
  },
  updateUser: function(prop, info) {
    if (this.hasOwnProperty(prop)) {
      this.prop = info;
      return console.log(this.name + "info updated successfully!");
    }
    return console.log("User property does not exist");
  },
  searchUser: function(name) {
    for (const user of db.usersDB) {
      if (user.name === name) {
        console.log("User found");
        return user;
      }
    }
  }
};

module.exports = User;
