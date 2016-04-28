
'use strict';

var passport       = require('passport'),
  LocalStrategy    = require('passport-local').Strategy,
  User             = require('../models/user');
  
module.exports = passport;

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: 'Unknown user ' + username });
    }
    user.comparePassword(password, (err, match) => {
      if (err) {
        return done(err);
      }
      if (match) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid password' });
      }
    });
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (user) {
      return done(err, user.toJSON());
    }
    return done(null, false);
  });
});

