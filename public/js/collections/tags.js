/**
 * tags collection
 * 
 */
define([
  '../models/tag'
], function(TagModel) {
  return Backbone.Collection.extend({
    
    url: '/api/tags',

    model: TagModel,

    comparator: 'name',

    initialize: function() {
    }
  });
});

