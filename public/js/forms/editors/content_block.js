/**
 * Content block editor
 * 
 * 
 */
define([
  'backbone',
  'template',
  'backbone-forms'
], function(
  Backbone,
  template
) {
  return Backbone.Form.editors.TextArea.extend({
    
    events: { 
      'click .edit':      'edit'
    },

    initialize: function(opts) {
      Backbone.Form.editors.TextArea.prototype.initialize.call(this, opts); 
      this.setElement(template.render('admin/content_block_editor', {
        name: this.key,
        editor_id: this.id
      }));
      this.$textarea = this.$el.find('textarea'); 
    },

    setValue: function(value) {
      this.$textarea.val(value);
    },

    getValue: function() {
      return this.$textarea.val();
    }


  });
});
