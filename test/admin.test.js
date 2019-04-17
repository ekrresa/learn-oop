var User = require("../User/User");
var Admin = require("../User/Admin");
var Order = require("../Order/Order");
var db = require("../database");

describe("Admin Object Tests", function() {
  var kingsley, mike, felix;

  beforeEach(() => {
    kingsley = new Admin("Kingsley", "kingsley@gmail.com", "king");
    mike = new Admin("Mike", "mike@gmail.com", "ross");
    felix = new User("Felix", "felix@gmail.com", "fudge");
  });

  afterEach(function() {
    db.users.length = 0;
  });

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
  test("should check if array is empty before deleting", function() {
    kingsley.deleteAllUsers();
    expect(kingsley.deleteAllUsers()).toBe("No users presently");
  });
});

describe("Testing Order functionality", function() {
  var kingsley, mike, felix;

  beforeEach(() => {
    kingsley = new Admin("Kingsley", "kingsley@gmail.com", "king");
    mike = new Admin("Mike", "mike@gmail.com", "ross");
    felix = new User("Felix", "felix@gmail.com", "fudge");

    mike.makeOrder("rice", "indomie");
    felix.makeOrder("onions", "beans", "beer");
    kingsley.makeOrder("beans", "yam", "meat");
  });

  afterEach(function() {
    db.users.length = 0;
    db.orders.length = 0;
  });

  test("should return new order object", function() {
    expect(mike.makeOrder("rice", "stew") instanceof Order).toBe(true);
  });
  test("should match userID in order to ID of buyer", function() {
    expect(mike.makeOrder("rice", "stew").user_id).toBe(mike.id);
  });
  test("should read all orders", function() {
    expect(mike.readAllOrders()).toEqual(expect.any(Array));
  });
  test("should read an order", function() {
    expect(mike.readOneOrder(1)).toEqual(expect.any(Object));
  });
  test("should send message if order not found", function() {
    expect(mike.readOneOrder(4)).toEqual("Order does not exist");
  });
  test("should update an order", function() {
    var update = mike.editOrder(2, "products", ["beans", "yam"]);
    expect(update.products).toEqual(["beans", "yam"]);
  });
  test("should only update products in an order", function() {
    var update = mike.editOrder(2, "date", new Date().toDateString());
    expect(update).toBe("Only products can be edited");
  });
  test("should delete an order", function() {
    expect(kingsley.deleteOrder(2)).toBe("Order deleted");
  });
  test("should delete all orders", function() {
    mike.deleteAllOrders();
    expect(db.orders.length).toBe(0);
  });
  test("should not delete orders that do not exist", function() {
    expect(mike.deleteOrder(4)).toBe("Order not found");
  });
});
