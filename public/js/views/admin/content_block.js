/**
 * content_block view
 * 
 */
define([
  'views/base',
  'models/content_block',
  './modal/form',
  'forms/content_block',
  'lib/dialog'
], function(
  BaseView,
  ContentBlockModel,
  ModalFormView,
  ContentBlockForm,
  dialog
) {
  return BaseView.extend({

    events: {
    },
    
    initialize: function(opts) {
    },
    
    render: function() {
      this.form = new ContentBlockForm({
        model:         this.model,
        check_unique:  false,
        name_disabled: true
      }).render();
      this.listenTo(this.form, 'init-error', this.showServerError);
      this.setElement(this.form.el);
      return this;
    },
    
    renderModal: function(opts) {
      this.render();
      var modal_view = new ModalFormView({ form: this.form });
      modal_view.modal({
        title: 'Edit Content Block',
        body: this.$el
      });
      this.listenTo(modal_view, 'save', this.save);
      modal_view.listenTo(this, 'save', modal_view.hide);
    },
    
    save: function() {
      var errors = this.form.commit(),
          obj    = this;
      if (!errors) {
        this.trigger('save');
      }
    }

  });
});
