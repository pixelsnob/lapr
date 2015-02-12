/**
 * images collection
 * 
 */
define([
  '../models/image'
], function(ImageModel) {
  return Backbone.Collection.extend({
    
    url: '/images',

    model: ImageModel,

    comparator: 'filename',

    initialize: function() {
    }
  });
});
