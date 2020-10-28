const passport = require("passport");
const { Strategy } = require("passport-local");

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      { usernameField: "name", passwordField: "password" },
      (name, password, done) => {
        const user = { name, password };
        done(null, user);
      }
    )
  );
};
