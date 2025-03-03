const crypto = require("crypto");

function generateOpaqueToken() {
  return crypto.randomBytes(32).toString("hex");
}

module.exports = generateOpaqueToken;
