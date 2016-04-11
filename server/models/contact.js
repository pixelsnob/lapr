
'use strict';

var db = require('mongoose');

var Schema = new db.Schema({
  name:           { type: String },
  email:          { type: String },
  phone:          { type: String },
  comments:       { type: String },
  date:           { type: Date, default: Date.now }
});

module.exports = function(mai) {
  Schema.plugin(mai.plugin, {
    model: 'Contact',
    startAt: 1
  });
  return db.model('Contact', Schema);
};

