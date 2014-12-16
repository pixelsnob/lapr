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

    initialize: function() {
    },

    parse: function(data) {
      //console.log(this.tag_categories);
      return data;
    }
  });
});

