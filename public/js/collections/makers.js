/**
 * makers collection
 * 
 */
define([
  '../models/maker'
], function(MakerModel) {
  return Backbone.Collection.extend({
    
    url: '/makers',

    model: MakerModel,

    initialize: function() {
    }
  });
});
