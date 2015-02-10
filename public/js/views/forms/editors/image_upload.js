/**
 * Image upload custom editor
 * 
 */
define([
  'backbone',
  'views/admin/modal_form',
  'template',
  'models/file/image',
  'collections/loaded_images',
  'backbone-forms',
  'form-editors/list'
], function(Backbone, ModalFormView, template, ImageModel, loaded_images) {
  
  return Backbone.Form.editors.Text.extend({
    
    events: {
      'change input[type=file]':   'fileChange'
    },

    initialize: function() {
      Backbone.Form.editors.Text.prototype.initialize.apply(this, arguments); 
      this.image_model = new ImageModel;

      this.setElement(template.render('admin/image_upload', {
        name: this.key,
        editor_id: this.id
      }));

      this.$hidden_input = this.$el.find('input[type="hidden"]');
      this.$file_input = this.$el.find('input[type="file"]');
      this.$error = this.$el.find('[data-error]');
      this.$image_container = this.$el.find('.image');
      var obj = this;
      this.listenTo(this.image_model, 'upload', function(res) {
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
      var src = '/images/products/' + this.model.get(this.key),
          img = $('<img>').attr('src', src).width(200);
      this.$image_container.html(img);
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
        obj.image_model.set({
          file: file,
          src: reader.result
        });
        reader.onload = null;
        if (obj.image_model.isValid()) {
          obj.$el.find('img').attr('src', reader.result);
          obj.image_model.upload();
        } else {
          obj.$error.text(obj.image_model.validationError);
          obj.$error.delay(5000).fadeOut();
        }
      };
      reader.readAsDataURL(file);
      return false;
    }
    
    /*,
    
    uploadReady: function(model) {
      if (model.isValid()) {
        this.$upload_btn.show(); 
      } else {
        this.$error.text(model.validationError);
        this.$upload_btn.hide();
      }
    },
    
    upload: function() {
      this.model.upload();
      this.$progress.show();
      this.$upload_btn.hide();
      this.$error.empty();
      this.$file_input.hide();
      return false;
    },

    uploadProgress: function(pct) {
      this.$progress.text(pct + '% uploaded');
    },*/


  });
});
