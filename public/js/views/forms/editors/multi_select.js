/**
 * Multiselect
 * 
 * 
 */
define([ 'backbone', 'backbone-forms' ], function(Backbone) {
  return Backbone.Form.editors.Select.extend({
    
    initialize: function(opts) {
      this.$el.prop('multiple', true);
      Backbone.Form.editors.Select.prototype.initialize.call(this, opts); 
    },

    // Refresh editor in case options have changed -- this is less messy
    // than listening to collection events, etc.
    refresh: function(opts) {
      var old_val = this.getValue();
      this.render();
      this.setValue(old_val);
    }

  });
});
