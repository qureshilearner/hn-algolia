const passport = require("passport");
require("./strategy/local.stretegy")();

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  //Stores User In Session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  //Retrieve User from Session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
