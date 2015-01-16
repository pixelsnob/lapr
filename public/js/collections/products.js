/**
 * products collection
 * 
 */
define([
  '../models/product',
  '../models/maker',
  '../models/product_category'
], function(
  ProductModel,
  MakerModel,
  ProductCategoryModel
) {
  return Backbone.Collection.extend({
    
    url: '/products',

    model: ProductModel,

    comparator: 'name',

    initialize: function(models, opts) {
      this.refs = (opts && opts.refs) || {};
    }

  });
});
