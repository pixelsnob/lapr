/**
 * makers collection
 * 
 */
define([
  '../models/maker'
], function(MakerModel) {
  return Backbone.Collection.extend({
    
    url: '/api/makers',

    model: MakerModel,

    comparator: 'name',

    initialize: function() {
    }
  });
});
