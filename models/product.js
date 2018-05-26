
"use strict";

var mongoose   = require('mongoose'),
    lunr       = require('lunr'),
    _          = require('underscore');

var ProductSchema = new mongoose.Schema({
  categories:             [{ type: Number, ref: 'ProductCategory' }],
  name:                   String,
  slug:                   { type: String },
  alt_names:              String,
  makers:                 [{ type: Number, ref: 'Maker' }],
  description:            String,
  more_info:              String,
  model_no:               String,
  price:                  String,
  price_label:            { type: String, enum: [ null, 'Day', 'Week' ] },
  range:                  String,
  image:                  String,
  images:                 [{ type: Number, ref: 'Image' }],
  sizes:                  String,
  octaves:                Number,
  tags:                   [{ type: Number, ref: 'Tag' }],
  youtube_videos:         [{ type: Number, ref: 'YoutubeVideo' }],
  octave_shift:           Number,
  hide_sizes_in_lists:    Boolean,
  include_in_slideshow:   Boolean,
  hide_sounds_disclaimer: Boolean
});

ProductSchema.statics.findByIdAndPopulate = function(id, cb) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return cb(null, null);
  }
  this.findById(id).populate('categories makers').exec(cb);
},

// Runs a product "full text" search
ProductSchema.statics.search = function(query, opts, str, cb) {
  this.find(query, null, opts).populate('categories makers')
  .exec((err, products) => {
    if (err) {
      return cb(err);
    }
    if (str) {
      var search_index = lunr(function() {
        this.field('name');
        this.field('alt_names');
        this.field('description');
        this.field('makers');
        this.field('category');
        this.field('model_no');
        this.field('range');
        this.field('sizes');
      });
      products.forEach(product => {
        search_index.add({
          id:            product._id,
          name:          product.name,
          alt_names:     product.alt_names,
          description:   product.description,
          makers:        (_.isArray(product.makers) ? product.makers.join(', ') : []),
          model_no:      product.model_no,
          range:         product.range,
          sizes:         product.sizes
        });
      });
      var search_res = search_index.search(str);
      if (search_res) {
        // Filter out products that aren't also in the search results
        products = products.filter(product => 
          _.findWhere(search_res, { ref: String(product._id) })
        );
      }
    }
    cb(null, products);
  });
};

// Set some conditional defaults
ProductSchema.pre('save', function(next) {
  // Add a slug if one isn't provided
  if (!this.slug) {
    this.slug = require('../lib/slug')(this.name); 
  }
  // Default to "Day" price label if one isn't provided
  if (this.price && !this.price_label) {
    this.price_label = 'Day';
  }
  next();
});

ProductSchema.plugin(require('mongoose-paginate'));

module.exports = mai => {
  ProductSchema.plugin(mai.plugin, { model: 'Product', startAt: 1 });
  return mongoose.model('Product', ProductSchema);
};

