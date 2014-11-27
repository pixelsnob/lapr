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
      //this.form = new ProductForm({ model: this.model });
      this.form = new Backbone.Form({ model: this.model });
      this.model.fetch({ success: _.bind(this.trigger, this, 'ready') });
    },
    
    render: function() {
      return this.el;
    },

    renderModal: function() {
      var modal_view = new ModalFormView({ form: this.form });
      modal_view.modal({
        title: 'Edit Product',
        body: this.form.render().el,
        save_label: 'Save'
      });
      this.form.setValue(this.model.toJSON());
      //console.log(this.model);
    }

  });
});
