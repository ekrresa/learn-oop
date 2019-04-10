var User = require("./user");

describe("User Object Tests", function() {
  var felix = new User("Felix", "felix@gmail.com", "passed");
  var oscar = new User("Oscar", "oscar@gmail.com", "ksuds3");

  test("should be a construction function", function() {
    expect(felix instanceof User).toBe(true);
    expect(oscar instanceof User).toBe(true);
  });

  test("should have name property of Felix", function() {
    var username = felix.name;
    expect(username).toBe("Felix");
  });

  test("should return user object", function() {
    var user1 = felix.getUser(felix.id);
    var user2 = oscar.getUser(oscar.id);
    expect(user1.email).toBe("felix@gmail.com");
    expect(user2.password).toBe("ksuds3");
  });

  test("should update user info", function() {
    felix.updateUser("password", "renee");

    expect(felix.password).toBe("renee");
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
});
