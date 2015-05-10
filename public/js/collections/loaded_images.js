/**
 * Keeps track of which images have loaded
 * 
 */
define([
  '../models/product'
], function(ProductModel) {
  var collection = Backbone.Collection.extend({
    
    initialize: function() {
    }
    
  });
  return new collection;
});

