/**
 * Product details large image popup
 * 
 */
define([
  'views/base',
  'views/modal',
  'template'
], function(
  BaseView,
  ModalView,
  template
) {
  
  return BaseView.extend({
    
    events: {
    },

    initialize: function(opts) {
      this.refs = this.model.collection.refs;
    },
    
    render: function() {
      var product        = this.model.toJSON(),
          product_image  = this.model.get('image'),
          obj            = this;
      if (product_image) {
        this.$el.html(template.render('partials/product_details_image', {
          product: product
        }));
      }
      return this;
    },
    
    renderModal: function(opts) {
      this.render();
      var modal_view = new ModalView;
      modal_view.$el.addClass('product-details-image');
      modal_view.render({
        body: this.$el
      });
      this.listenTo(modal_view, 'hide', this.close);
    }
    
  });
});

