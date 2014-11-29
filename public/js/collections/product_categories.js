/**
 * product_categories collection
 * 
 */
define([
  '../models/product_category'
], function(ProductCategoryModel) {
  return Backbone.Collection.extend({
    
    url: '/categories',

    model: ProductCategoryModel,

    initialize: function() {
    }
  });
});
