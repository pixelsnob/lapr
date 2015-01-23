/**
 * tag_categories collection
 * 
 */
define([
  '../models/tag_category'
], function(TagCategoryModel) {
  return Backbone.Collection.extend({
    
    url: '/tag-categories',

    model: TagCategoryModel,

    comparator: 'sort_order',

    initialize: function() {
    }
  });
});
