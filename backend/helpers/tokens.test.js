const jwt = require("jsonwebtoken");
const { createToken, createPatientToken } = require("./tokens");
const { SECRET_KEY } = require("../config");

describe("Token creation functions", () => {
  describe("createToken", () => {
    it("should return a valid JWT for provider", () => {
      const provider = { id: 1, isAdmin: true };
      const token = createToken(provider);
      const decoded = jwt.verify(token, SECRET_KEY);
      expect(decoded.providerId).toBe(provider.id);
      expect(decoded.isAdmin).toBe(provider.isAdmin);
    });

    it("should return a valid JWT for non-admin provider", () => {
      const provider = { id: 2, isAdmin: false };
      const token = createToken(provider);
      const decoded = jwt.verify(token, SECRET_KEY);
      expect(decoded.providerId).toBe(provider.id);
      expect(decoded.isAdmin).toBe(provider.isAdmin);
    });
  });

  describe("createPatientToken", () => {
    it("should return a valid JWT for patient", () => {
      const patient = { id: 1 };
      const token = createPatientToken(patient);
      const decoded = jwt.verify(token, SECRET_KEY);
      expect(decoded.patientId).toBe(patient.id);
    });
  });
});
