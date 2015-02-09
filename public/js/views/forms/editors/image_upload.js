/**
 * 
 * 
 */
define([
  'backbone',
  'views/admin/modal_form',
  'backbone-forms',
  'form-editors/list'
], function(Backbone, ModalFormView) {
  
  return Backbone.Form.editors.Text.extend({
    
    events: {
      //'click [data-editor] input': 'uploadModal'
    },

    initialize: function(opts) {
      //var List = Backbone.Form.editors.List;
      //this.events = _.defaults(List.prototype.events, this.events);
      Backbone.Form.editors.Text.prototype.initialize.call(this, opts); 
      //this.$el.prop('type', 'file');

    },

    uploadModal: function(ev) {
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
    }

  });
});
