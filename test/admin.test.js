var User = require("../User/user");
var Admin = require("../User/admin");
var db = require("../database");

describe("Admin Object Tests", function() {
  var kingsley = new Admin("Kingsley", "kingsley@gmail.com", "king");
  var mike = new Admin("Mike", "mike@gmail.com", "ross");
  var felix = new User("Felix", "felix@gmail.com", "fudge");

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
