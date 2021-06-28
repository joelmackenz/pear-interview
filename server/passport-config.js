const User = require("./models/user");

function initialize(passport) {
  passport.use(User.createStrategy());
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

module.exports = initialize;
