/**
 * 
 */
define([
  'cms-lib/views/base',
  'cms-lib/views/modal/form'
], function(BaseView, ModalFormView) {
  return BaseView.extend({

    events: {
    },
    
    initialize: function() {
      /*this.form = new OptionsForm({
        model: this.model,
        fields: [ 'title', 'keywords', 'description' ]
      });*/
    },
    
    render: function() {
      return this.el;
    },

    renderModal: function() {
      var modal_view = new ModalFormView({ form: this.form });
      //this.listenTo(modal_view, 'open', this.focus);
      //this.listenTo(modal_view, 'save', this.save);
      //modal_view.listenTo(this, 'save', modal_view.hide);
      modal_view.modal({
        title: 'Edit Product',
        body: this.render().el,
        save_label: 'Save'
      });
    },

  });
});
