
"use strict";

var mongoose = require('mongoose'),
    Tag      = require('./tag');

var TagCategorySchema = new mongoose.Schema({
  name: String
}, { collection: 'tag_categories' });

TagCategorySchema.pre('remove', function(next) {
  Tag.update(
    { category: this._id },
    { $pull: { category: this._id }},
    { multi: true },
    next
  );
});

module.exports = function(mai) {
  return mongoose.model('TagCategory', TagCategorySchema);
};


