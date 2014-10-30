
var mongoose = require('mongoose');

var TempProduct = new mongoose.Schema({
  url: String,
  cols: Array
}, { collection: 'temp_products'} );

module.exports = mongoose.model('TempProduct', TempProduct);
