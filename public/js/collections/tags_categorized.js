/**
 * tags collection as a tree structure
 * 
 */
define([
  '../models/tag',
  '../collections/tag_categories'
], function(TagModel, TagCategories) {
  return Backbone.Collection.extend({
    
    url: '/tags',

    model: TagModel,

    initialize: function() {
    }
  });
});
