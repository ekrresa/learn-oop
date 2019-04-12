var User = require("../User/user");
var Admin = require("../User/admin");
var db = require("../database");

describe("Admin Object Tests", function() {
  var kingsley = new Admin("Kingsley", "kingsley@gmail.com", "king");
  var mike = new Admin("Mike", "mike@gmail.com", "ross");
  var felix = new User("Felix", "felix@gmail.com", "fudge");
  mike.makeOrder("rice", "indomie");
  felix.makeOrder("onions", "beans", "beer");

  test("should inherit from User", function() {
    expect(kingsley instanceof User).toBe(true);
  });

  test("should return user object", function() {
    var user1 = mike.getUser(mike.id);
    expect(user1.email).toBe("mike@gmail.com");
    expect(user1.password).toBe("ross");
  });

  test("should update user info", function() {
    kingsley.updateUser("password", "renee");
    expect(kingsley.password).toBe("renee");
  });

  test("should search for a user", function() {
    var search = mike.searchUser("Felix");
    expect(search.name).toBe("Felix");
  });

  test("should return all users from DB", function() {
    expect(kingsley.readAllUsers()).toEqual(expect.any(Array));
  });

  test("should delete a user", function() {
    expect(kingsley.deleteUser("Mike")).toBe("Mike has been deleted");
  });
  test("should delete all users", function() {
    expect(kingsley.deleteAllUsers()).toBe("All users deleted");
  });
  test("only admins should delete a user", function() {
    expect("deleteUser" in felix).toBeFalsy();
  });
});

describe("Testing Order functionality", function() {
  var kingsley = new Admin("Kingsley", "kingsley@gmail.com", "king");
  var mike = new Admin("Mike", "mike@gmail.com", "ross");
  var felix = new User("Felix", "felix@gmail.com", "fudge");
  mike.makeOrder("rice", "indomie");
  felix.makeOrder("onions", "beans", "beer");
  kingsley.makeOrder("beans", "yam", "meat");

  test("should read all orders", function() {
    expect(mike.readAllOrders()).toEqual(expect.any(Array));
  });
  test("should read an order", function() {
    expect(mike.readOneOrder(1)).toEqual(expect.any(Object));
  });
  test("should update an order", function() {
    var update = mike.editOrder(2, "products", ["beans", "yam"]);
    expect(update.products).toEqual(["beans", "yam"]);
  });
  test("should delete an order", function() {
    var update = mike.editOrder(2, "products", ["beans", "yam"]);
    expect(kingsley.deleteOrder(2)).toBe("Order deleted");
  });
  test("should delete all orders", function() {
    mike.deleteAllOrders();
    expect(db.ordersDB.length).toBe(0);
  });
});
