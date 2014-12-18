
"use strict";

var mongoose   = require('mongoose'),
    Product    = require('./product');

var MakerSchema = new mongoose.Schema({
  name: String,
});

MakerSchema.pre('remove', function(next) {
  Product.update(
    { makers: this._id },
    { $pull: { makers: this._id }},
    { multi: true },
    next
  );
});

module.exports = mongoose.model('Maker', MakerSchema);
