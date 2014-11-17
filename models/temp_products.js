
var mongoose = require('mongoose');

var TempProduct = new mongoose.Schema({
  category: String,
  name: String,
  alt_names: String,
  maker: String,
  makers: Array,
  _description: String,
  description: String,
  model_no: String,
  price: String,
  range: String,
  image: String,
  sizes: String,
  octaves: Number
}, { collection: 'temp_products' });

module.exports = mongoose.model('TempProduct', TempProduct);
