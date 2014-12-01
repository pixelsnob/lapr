/**
 * product view
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

    model: new ProductModel,
    events: {
    },
    
    initialize: function(opts) {
      
    },
    
    render: function() {
      return this;
    },

    renderModalForm: function() {
      this.form = new Backbone.Form({ model: this.model }).render();
      var modal_view = new ModalFormView({ form: this.form });
      modal_view.modal({
        title: 'Edit Product',
        body: this.form.el,
        save_label: 'Save'
      });
      this.listenTo(modal_view, 'save', this.save);
      modal_view.listenTo(this, 'save', modal_view.hide);
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
