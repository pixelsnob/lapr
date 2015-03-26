
'use strict';

var db = require('mongoose');

var ProductTypeSchema = new db.Schema({
  name: { type: String, unique: false }
}, { collection: 'temp_product_types' });

ProductTypeSchema.index({ name: 'text' });
module.exports = function(mai) {
  return db.model('TempProductType', ProductTypeSchema);
};


