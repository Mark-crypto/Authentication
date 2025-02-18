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

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (user, done) {
  User.findById(id, function (err, user) {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});
