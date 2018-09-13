// Create the type of passport straegy we use for this socila media app. We will use a Jwt Stategy
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require("../models/User");
const keys = require("./keys");

let opts = {};
// npm passport-jwt for the options
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";

// This can only be used if we specify/use it on a particular route
// We want to use this on a protected route when the user logs in
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => {
          console.log(err);
          return done(err, false);
        });
    })
  );
};
