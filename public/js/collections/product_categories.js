/**
 * product_categories collection
 * 
 */
define([
  '../models/product_category'
], function(ProductCategoryModel) {
  return Backbone.Collection.extend({
    
    url: '/api/categories',

    model: ProductCategoryModel,

    comparator: 'name',

    initialize: function() {
    }
  });
});
