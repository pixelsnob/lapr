/**
 * 
 * 
 */
define([
  'backbone',
  'views/admin/modal_form',
  'template',
  'backbone-forms',
  'form-editors/list'
], function(Backbone, ModalFormView, template) {
  
  return Backbone.Form.editors.Text.extend({
    
    events: {
    },

    initialize: function(opts) {
      Backbone.Form.editors.Text.prototype.initialize.call(this, opts); 
    },

    render: function() {
      this.setElement(template.render('admin/image_upload', {
        name: this.key,
        editor_id: this.id
      }));
      this.setValue(this.value);
      return this;
    },

    getValue: function() {
      return this.$el.find('input').val();
    },

    setValue: function(value) {
      this.$el.find('input').val(value);
    }

  });
});
