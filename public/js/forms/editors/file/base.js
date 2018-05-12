/**
 * Image upload custom editor
 * 
 */
import Backbone from 'backbone';
import ModalFormView from 'views/admin/modal/form';
import template from 'template';
import 'backbone-forms';

export default Backbone.Form.editors.Text.extend({

  events: {
    'change input[type=file]': 'fileChange',
    'click .delete-file': 'deleteFile'
  },

  initialize: function() {
    Backbone.Form.editors.Text.prototype.initialize.apply(this, arguments);
    this.file_model = new this.file_model;
    var key = this.key;
    this.setElement(template.render('admin/file_upload', {
      name: this.key,
      editor_id: this.id
    }));
    this.$hidden_input = this.$el.find('input[type="hidden"]');
    this.$file_input = this.$el.find('input[type="file"]');
    this.$error = this.$el.find('[data-error]');
    this.$preview = this.$el.find('.preview');
    this.$filename = this.$el.find('.filename');
    this.listenTo(this.file_model, 'upload', res => {
      if (typeof res.path != 'undefined') {
        // Store tmp path so that it can be moved to its permanent dest
        // on the server
        this.model.set('tmp_' + key, res.path, {
          silent: true
        });
        this.setValue(res.name);
      }
      this.toggleDelete();
      this.updateFilename();
    });
  },

  render: function() {
    this.setValue(this.value);
    this.model.unset('tmp_' + this.key, {
      silent: true
    });
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
    var file = ev.currentTarget.files[0],
      reader = new FileReader;

    reader.onload = ev => {
      this.file_model.set({
        file: file,
        src: reader.result
      });
      reader.onload = null;
      if (this.file_model.isValid()) {
        this.trigger('reader-loaded', reader);
        this.file_model.upload();
        this.form.fields[this.key].clearError();
      } else {
        this.form.fields[this.key].setError(this.file_model.validationError);
        this.$file_input.val('');
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
