/**
 * tags collection
 * 
 */
define([
  '../models/tag',
  '../collections/tag_categories'
], function(TagModel, TagCategories) {
  return Backbone.Collection.extend({
    
    url: '/tags',

    model: TagModel,

    comparator: 'name',

    initialize: function() {
    }
  });
});

