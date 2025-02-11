const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./database");
const User = connection.models.User;

const customFields = {
  usernameField: "uname",
  passwordField: "pw",
};
const verifyCallback = (username, password, done) => {
  User.findOne({ username: username }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    const isValid = validPassword(password, user.hash, user.salt);
    if (isValid) {
      return done(null, user);
    } else {
      return done(null, user);
    }
  });
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);
