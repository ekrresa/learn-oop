var User = require("../User/User");
var db = require("../database");

describe("User Object Tests", function() {
  var felix;
  var oscar;

  beforeEach(() => {
    felix = new User("Felix", "felix@gmail.com", "passed");
    oscar = new User("Oscar", "oscar@gmail.com", "ksuds3");
  });

  afterEach(function() {
    db.users.length = 0;
  });

  test("should be a construction function", function() {
    expect(felix instanceof User).toBe(true);
    expect(oscar instanceof User).toBe(true);
  });

  test("should return user object", function() {
    var user1 = felix.getUser(felix.id);
    expect(user1.email).toBe("felix@gmail.com");
  });

  test("should check if user exists", function() {
    var result = felix.getUser(3);
    expect(result).toBe("User does not exist");
  });

  test("should update user info", function() {
    felix.updateUser("password", "renee");
    expect(felix.password).toBe("renee");
  });
  test("should not update user ID", function() {
    expect(felix.updateUser("id", "2")).toBe("Operation not allowed");
  });

  test("should not update when passes invalid property", function() {
    var result = felix.updateUser("mail", "felix4life@gmail.com");

    expect(result).toBe("User property does not exist");
  });

  test("should search for a user", function() {
    var search = felix.searchUser("Oscar");
    expect(search.name).toBe("Oscar");
  });

  test("should return false if user does not exist", function() {
    var search = felix.searchUser("Esther");
    expect(search).toBe(false);
  });
  test("should make an order", function() {
    var order = felix.makeOrder("yam", "oil");
    expect(order).toEqual(expect.any(Object));
  });
  test("should make an order only when there are products", function() {
    var order = oscar.makeOrder();
    expect(order).toBe("Valid order needs products");
  });
});
