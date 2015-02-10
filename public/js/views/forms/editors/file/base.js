/**
 * Image upload custom editor
 * 
 */
define([
  'backbone',
  'views/admin/modal_form',
  'template',
  'backbone-forms'
], function(
  Backbone,
  ModalFormView,
  template
) {
  
  return Backbone.Form.editors.Text.extend({
    
    events: {
      'change input[type=file]':   'fileChange'
    },

    initialize: function() {
      Backbone.Form.editors.Text.prototype.initialize.apply(this, arguments); 
      //this.file_model = new ImageModel;
      this.file_model = new this.file_model;
      this.setElement(template.render('admin/file_upload', {
        name: this.key,
        editor_id: this.id
      }));
      this.$hidden_input      = this.$el.find('input[type="hidden"]');
      this.$file_input        = this.$el.find('input[type="file"]');
      this.$error             = this.$el.find('[data-error]');
      this.$preview           = this.$el.find('.preview');
      var obj = this;
      this.listenTo(this.file_model, 'upload', function(res) {
        if (typeof res.path != 'undefined') {
          // Store tmp path so that it can be moved to its permanent dest
          // on the server
          obj.model.set('tmp_' + this.key, res.path, { silent: true });
          //obj.model.trigger('change', obj.model);
          obj.setValue(res.name);
        }
      });
    },

    render: function() {
      this.setValue(this.value);
      return this;
    },

    getValue: function() {
      return this.$hidden_input.val();
    },

    setValue: function(value) {
      this.$hidden_input.val(value);
    },
    
    fileChange: function(ev) {
      var file      = ev.currentTarget.files[0],
          reader    = new FileReader,
          obj       = this;
      reader.onload = function(ev) {
        obj.file_model.set({
          file: file,
          src: reader.result
        });
        reader.onload = null;
        if (obj.file_model.isValid()) {
          obj.trigger('reader_loaded', reader);
          obj.file_model.upload();
        } else {
          obj.$error.text(obj.file_model.validationError);
          obj.$error.delay(5000).fadeOut();
        }
      };
      reader.readAsDataURL(file);
      return false;
    }
    
  });
});
