/**
 * Select list of images
 * 
 */

define([
  'backbone',
  'views/admin/image',
  'template',
  'backbone-forms'
], function(
  Backbone,
  ImageView,
  template
) {
  
  return Backbone.Form.editors.Select.extend({
    
    events: {
      'click .edit':       'editImage',
      'change select':     'updatePreview'
    },

    initialize: function(opts) {
      Backbone.Form.editors.Select.prototype.initialize.call(this, opts); 
      this.setElement(template.render('admin/images_editor', {
        name: this.key,
        editor_id: this.id
      }));
      this.$select       = this.$el.find('select');
      this.$preview_img  = this.$el.find('.preview img');
      console.log(this.model.collection.refs.images);
      this.listenTo(this.model.collection.refs.images,
        'add change remove', this.render);
    },

    getValue: function(value) {
      return Number(this.$select.val());
    },

    // Refresh editor in case options have changed -- this is less messy
    // than listening to collection events, etc.
    refresh: function(opts) {
      var old_val = this.getValue();
      this.render();
      this.setValue(old_val);
    },

    render: function() {
      Backbone.Form.editors.Select.prototype.render.call(this);
      this.updatePreview();
      this.setValue(this.value);
      return this;
    },

    renderOptions: function(options) {
      var $select = this.$el,
          html;
      this.$select.html(this._getOptionsHtml(options));
      this.setValue(this.value);
    },
    
    setValue: function(value) {
      this.$select.val(value);
    },

    editImage: function(ev) {
      var image_model = this.model.collection.refs.images.findWhere({
        _id: this.getValue()
      });
      if (image_model) {
        var view = new ImageView({ model: image_model });
        view.renderEditForm();
        this.listenTo(view, 'save', function(model) {
          image_model.set(model.attributes); // <<<< fuck!
          //this.refresh();
        }); 
        this.listenTo(view, 'destroy', function(model) {
          image_model.destroy();
          //this.refresh();
        }); 
      }
      return false;
    },
    
    updatePreview: function() {
      var image = this.model.collection.refs.images.findWhere({
        _id: this.getValue()
      });
      console.log('u.p.');
      if (image) {
        this.$preview_img.attr('src', '/images/' + image.get('name'));
      }
      return false;
    }

  });
});
