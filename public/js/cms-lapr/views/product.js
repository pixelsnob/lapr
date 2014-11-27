/**
 * 
 */
define([
  'cms/views/base',
  'cms/views/modal/form',
  '../models/product',
  'backbone',
  'backbone-forms'
  //'../forms/product'
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
      var product = this.model.toJSON();
      this.form.setValue(product);
    }

  });
});
