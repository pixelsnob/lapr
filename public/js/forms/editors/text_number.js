/**
 * Overrides getValue() and casts to number 
 * 
 * 
 */
define([
  'backbone',
  'backbone-forms'
], function(
  Backbone
) {
  return Backbone.Form.editors.Text.extend({
    
    events: { 
    },

    initialize: function(opts) {
      Backbone.Form.editors.Text.prototype.initialize.call(this, opts); 
    },

    getValue: function() {
      var value = Backbone.Form.editors.Text.prototype.getValue.apply(this);
      return Number(value);
    }


  });
});
