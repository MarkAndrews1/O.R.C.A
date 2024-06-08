const jwt = require("jsonwebtoken");
const { createToken } = require("./tokens");
const { SECRET_KEY } = require("../config");

describe("createToken", () => {
  it("should return a JWT token with the correct payload", () => {
    // Mock provider object
    const provider = {
      providerName: "testProvider",
      isAdmin: true
    };

    // Call the createToken function
    const token = createToken(provider);

    // Verify the token
    const decodedToken = jwt.verify(token, SECRET_KEY);
    expect(decodedToken.providerName).toBe(provider.providerName);
    expect(decodedToken.isAdmin).toBe(provider.isAdmin);
  });

  it("should default isAdmin to false if not provided in provider", () => {
    // Mock provider object without isAdmin property
    const provider = {
      providerName: "testProvider"
    };

    // Call the createToken function
    const token = createToken(provider);

    // Verify the token
    const decodedToken = jwt.verify(token, SECRET_KEY);
    expect(decodedToken.providerName).toBe(provider.providerName);
    expect(decodedToken.isAdmin).toBe(false); // Expecting isAdmin to be false
  });

});
