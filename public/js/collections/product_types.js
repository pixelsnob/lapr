/**
 * product_type collection
 * 
 */
define([
  '../models/product_type'
], function(ProductTypeModel) {
  return Backbone.Collection.extend({
    
    url: '/api/product-types',

    model: ProductTypeModel,

    comparator: 'name',

    initialize: function() {
    }
  });
});
