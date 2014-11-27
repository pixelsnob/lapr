/**
 * 
 */
define([
  'cms/views/base',
  'cms/views/modal/form',
  '../models/product',
  'backbone',
  'backbone-forms'
], function(BaseView, ModalFormView, ProductModel, Backbone) {
  return BaseView.extend({

    events: {
    },
    
    initialize: function(opts) {
      this.model = new ProductModel({ id: opts.id });
      this.form = new Backbone.Form({ model: this.model }).render();
      var obj = this;
      this.model.fetch({
        success: function(model) {
          obj.trigger('ready');
        }
      });
    },
    
    render: function() {
      return this.el;
    },

    renderModal: function() {
      var modal_view = new ModalFormView({ form: this.form });
      modal_view.modal({
        title: 'Edit Product',
        body: this.form.el,
        save_label: 'Save'
      });
      this.listenTo(modal_view, 'save', this.save);
      modal_view.listenTo(this, 'save', modal_view.hide);
      this.form.setValue(this.model.formify());
    },

    save: function() {
      var errors = this.form.commit();
      if (!errors) {
        this.model.save(this.model.attributes, {
          wait: true,
          success: _.bind(this.trigger, this, 'save'),
          error:   _.bind(this.showServerError, this)
        });
      } else {
        this.showServerError();
      }
    }

  });
});
