/**
 * Select list of images
 * 
 */

define([
  'backbone',
  'template',
  'backbone-forms'
], function(Backbone, template) {
  
  return Backbone.Form.editors.Select.extend({
    
    initialize: function(opts) {
      Backbone.Form.editors.Select.prototype.initialize.call(this, opts); 
      this.setElement(template.render('admin/images_editor', {
        name: this.key,
        editor_id: this.id
      }));
    },

    // Make sure numeric ids don't get cast as strings << this should be abstracted
    getValue: function(value) {
      var value = Backbone.Form.editors.Select.prototype.getValue.call(this); 
      if (_.isArray(value)) {
        return value.map(function(v) { return Number(v); });
      }
      return Number(value);
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
