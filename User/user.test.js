var User = require("./user");

describe("User Object Tests", function() {
  var felix = new User();
  test("should be a construction function", function() {
    expect(felix instanceof User).toBe(true);
  });
});
