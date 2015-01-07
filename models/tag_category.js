
"use strict";

var db = require('mongoose');

var TagCategorySchema = new db.Schema({
  name: String
}, { collection: 'tag_categories' });

TagCategorySchema.pre('remove', function(next) {
  db.model('Tag').update(
    { category: this._id },
    { $pull: { category: this._id }},
    { multi: true },
    next
  );
});

module.exports = function(mai) {
  return db.model('TagCategory', TagCategorySchema);
};


