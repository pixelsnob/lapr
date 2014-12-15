/**
 * products collection
 * 
 */
define([
  '../models/product'
], function(ProductModel) {
  return Backbone.Collection.extend({
    
    url: '/api/products',

    model: ProductModel,

    comparator: 'name',

    initialize: function() {

    }
  });
});
