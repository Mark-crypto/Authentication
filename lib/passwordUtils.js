const crypto = require("crypto");

// TODO
function validPassword(password, hash, salt) {
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return {
    salt: salt,
    hash: genHash,
  };
}
function genPassword(password) {}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
