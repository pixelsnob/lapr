/**
 * Product details large image popup
 * 
 */
define([
  'views/base',
  'template'
], function(
  BaseView,
  template
) {
  
  return BaseView.extend({
    
    events: {
      'click .close':  'closeModal'
    },

    initialize: function(opts) {
      this.refs = this.model.collection.refs;
    },
    
    render: function() {
      this.setElement(template.render('product_details_image', {
        product: this.model.toJSON() }));
      this.$el.addClass('product-details-image');
      return this;
    },
    
    renderModal: function(opts) {
      this.render();
      this.$el.modal();
    },

    closeModal: function() {
      this.$el.modal('hide');
      this.close();
      return false;
    }
    
  });
});

