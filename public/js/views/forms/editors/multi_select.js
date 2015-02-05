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

    // Make sure numeric ids don't get cast as strings
    getValue: function(value) {
      var value = Backbone.Form.editors.Select.prototype.getValue.call(this); 
      if (_.isArray(value)) {
        return value.map(function(v) { return Number(v); });
      }
      return value;
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
