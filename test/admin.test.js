var User = require("../User/user");
var Admin = require("../User/admin");

describe("Admin Object Tests", function() {
  var kingsley = new Admin("Kingsley", "kingsley@gmail.com", "king");
  var mike = new Admin("Mike", "mike@gmail.com", "ross");

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

  test("should return all users from DB", function() {
    expect(kingsley.readAllUsers()).toEqual(expect.any(Array));
  });
});
