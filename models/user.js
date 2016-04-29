
'use strict';

var db         = require('mongoose'),
    bcrypt     = require('bcrypt');

var UserSchema = db.Schema({
  username: { type: String, unique: true },
  password: String,
  name: String
});

UserSchema.pre('save', function(next) {
  //var user = this;
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10 /*SALT_WORK_FACTOR*/, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, (err, match) => {
    if (err) {
      return cb(err);
    }
    cb(null, match);
  });
};

module.exports = db.model('User', UserSchema);

