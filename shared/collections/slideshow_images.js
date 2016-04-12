/**
 * Slideshow images collection
 * 
 */
define([
  '../models/image'
], function(ContentBlockModel) {
  return Backbone.Collection.extend({
    
    url: '/api/slideshow-images',

    comparator: 'name',

    initialize: function() {
    }
  });
});
