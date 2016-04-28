
"use strict";

var db = require('mongoose');

var TagCategorySchema = new db.Schema({
  name: { type: String, unique: true, index: true },
  sort_order: Number
}, { collection: 'tag_categories' });

TagCategorySchema.pre('remove', next => {
  db.model('Tag').update(
    { category: this._id },
    { $set: { category: 0 }},
    { multi: true },
    next
  );
});

module.exports = mai => {
  TagCategorySchema.plugin(mai.plugin, { model: 'TagCategory', startAt: 1 });
  return db.model('TagCategory', TagCategorySchema);
};


