/**
 * product_categories collection
 * 
 */
define([
  '../models/product_category'
], function(ProductCategoryModel) {
  return Backbone.Collection.extend({
    
    model: ProductCategoryModel,

    initialize: function() {
    }
  });
});
