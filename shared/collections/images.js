/**
 * images collection
 * 
 */
define([
  '../models/image'
], function(ImageModel) {
  return Backbone.Collection.extend({
    
    url: '/api/images',

    model: ImageModel,

    comparator: 'name',

    initialize: function() {
    }
  });
});

