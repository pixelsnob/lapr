/**
 * Image upload custom editor
 * 
 */
define([
  'backbone',
  'views/admin/modal/form',
  'template',
  'backbone-forms'
], function(
  Backbone,
  ModalFormView,
  template
) {
  
  return Backbone.Form.editors.Text.extend({
    
    events: {
      'change input[type=file]':   'fileChange',
      'click .delete-file':        'deleteFile'
    },

    initialize: function() {
      Backbone.Form.editors.Text.prototype.initialize.apply(this, arguments); 
      this.file_model = new this.file_model;
      this.setElement(template.render('admin/file_upload', {
        name: this.key,
        editor_id: this.id
      }));
      this.$hidden_input      = this.$el.find('input[type="hidden"]');
      this.$file_input        = this.$el.find('input[type="file"]');
      this.$error             = this.$el.find('[data-error]');
      this.$preview           = this.$el.find('.preview');
      this.$filename          = this.$el.find('.filename');
      var obj = this;
      this.listenTo(this.file_model, 'upload', function(res) {
        if (typeof res.path != 'undefined') {
          // Store tmp path so that it can be moved to its permanent dest
          // on the server
          obj.model.set('tmp_' + this.key, res.path, { silent: true });
          obj.setValue(res.name);
        }
        obj.toggleDelete();
        obj.updateFilename();
      });
    },

    render: function() {
      this.setValue(this.value);
      this.model.unset('tmp_' + this.key, { silent: true });
      this.toggleDelete();
      this.updateFilename();
      return this;
    },

    getValue: function() {
      return this.$hidden_input.val();
    },

    setValue: function(value) {
      this.value = value;
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
          obj.trigger('reader-loaded', reader);
          obj.file_model.upload();
          obj.form.fields[obj.key].clearError();        
        } else {
          obj.form.fields[obj.key].setError(obj.file_model.validationError);
          obj.$file_input.val('');
        }
      };
      reader.readAsDataURL(file);
      return false;
    },

    deleteFile: function() {
      this.setValue('');
      this.toggleDelete();
      this.updateFilename();
      this.trigger('delete-file', this.model);
      this.form.fields[this.key].clearError();
      return false;
    },

    toggleDelete: function() {
      var a = this.$el.find('.delete-file');
      if (this.value.length) {
        a.show();
      } else {
        a.hide();
      }
    },
    
    updateFilename: function() {
      this.$filename.text(this.getValue());
    }
    
  });
});
