/**
 * tags collection
 * 
 */
define([
  '../models/tag'
], function(TagModel) {
  return Backbone.Collection.extend({
    
    url: '/tags',

    model: TagModel,

    comparator: 'name',

    initialize: function() {
    }
  });
});

