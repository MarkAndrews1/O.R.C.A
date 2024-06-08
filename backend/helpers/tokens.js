const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** return signed JWT from user data. */

function createToken(provider) {
    console.assert(provider.isAdmin !== undefined,
        "createToken passed provider without isAdmin property");
  
    let payload = {
      providerId: provider.id,
      isAdmin: provider.isAdmin || false,
    };
  
    return jwt.sign(payload, SECRET_KEY);
  }

  function createPatientToken(patient) {
    console.assert(patient.id !== undefined,
        "createToken passed patient without id property");

    let payload = {
        patientId: patient.id,
        // You may add more properties to the payload if needed
    };

    return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken, createPatientToken };
