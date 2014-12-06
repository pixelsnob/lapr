/**
 * product_categories collection
 * 
 */
define([
  '../models/tonal_quality'
], function(TonalQualityModel) {
  return Backbone.Collection.extend({
    
    url: '/tonal_qualities',

    model: TonalQualityModel,

    initialize: function() {
    }
  });
});
