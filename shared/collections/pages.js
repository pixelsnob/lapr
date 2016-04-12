/**
 * pages collection
 * 
 */
define([
  '../models/page'
], function(PageModel) {
  return Backbone.Collection.extend({
    
    url: '/api/pages',

    model: PageModel,

    comparator: 'name',

    initialize: function() {
    }
  });
});
