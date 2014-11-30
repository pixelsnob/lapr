/**
 * List of images
 * 
 * 
 */
define([
  'backbone',
  'backbone-forms',
  'form-editors/list',
  'views/forms/editors/image_upload'
], function(Backbone, ImageUploadEditor) {
  
  var ListEditor = Backbone.Form.editors.List;

  Backbone.Form.editors.Images = ListEditor.extend({
    
    events: {
      'click [data-editor] input': 'uploadModal'
    },

    initialize: function(opts) {
      this.events = _.defaults(ListEditor.prototype.events, this.events);
      ListEditor.prototype.initialize.call(this, opts); 
    },

    /*uploadModal: function(ev) {
      return;///////////////
      ev.currentTarget.blur();
      var form = new Backbone.Form({
        schema: {
          file: 'Text'
        }
      });
      var modal_view = new ModalFormView({ form: form });
      modal_view.modal({
        title: 'Edit Product',
        body: form.render().el,
        save_label: 'Save'
      });
      //this.listenTo(modal_view, 'save', this.save);
      //modal_view.listenTo(this, 'save', modal_view.hide);
    },*/

    /*addItem: function(value, userInitiated) {
      return $('<div>').text('sssssssssss');
      //var item = ListEditor.prototype.addItem.call(this, value, userInitiated);
      if (value) {
        item.$el.prepend($('<img>').attr('src', '/images/products/' + value));
      }
      return item;
    }*/

  });
});
