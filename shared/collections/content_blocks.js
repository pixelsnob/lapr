/**
 * content_blocks collection
 * 
 */
define([
  '../models/content_block'
], function(ContentBlockModel) {
  return Backbone.Collection.extend({
    
    url: '/api/content-blocks',

    model: ContentBlockModel,

    comparator: 'name',

    initialize: function() {
    }
  });
});
