
var mongoose = require('mongoose');

var Product = new mongoose.Schema({
  category: String,
  name: String,
  maker: String,
  description: String,
  model_no: String,
  price: String,
  range: String,
  image: String
});

module.exports = mongoose.model('Product', Product);
