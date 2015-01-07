
'use strict';

var db = require('mongoose');

var MakerSchema = new db.Schema({
  name: String,
});

MakerSchema.pre('remove', function(next) {
  db.model('Product').update(
    { makers: this._id },
    { $pull: { makers: this._id }},
    { multi: true },
    next
  );
});

module.exports = function(mai) {
  MakerSchema.plugin(mai.plugin, {
    model: 'Maker',
    startAt: 0
  });
  return db.model('Maker', MakerSchema);
};


