/**
 * Product details modal view
 * 
 */
define([
  'views/base',
  'views/product_details_image',
  'template'
], function(
  BaseView,
  ProductDetailsImageView,
  template
) {
  
  return BaseView.extend({
    
    events: {
      'click .image img': 'showImageModal',
      'click .close':     'closeModal'
    },

    initialize: function(opts) {
      this.refs = this.model.collection.refs;
    },
    
    render: function() {
      var makers  = this.model.get('makers'),
          product = this.model.toJSON(),
          obj    = this;
      if (_.isArray(makers)) {
        product.makers = makers.map(function(maker_id) {
          var maker = obj.refs.makers.findWhere({ _id: maker_id });
          return maker;
        });
      }
      this.setElement(template.render('partials/product_details', { product: product }));
      this.$el.addClass('product-details');
      return this;
    },
    
    renderModal: function(opts) {
      this.render();
      this.$el.modal();
    },

    closeModal: function() {
      this.$el.modal('hide').remove();
      this.close();
      return false;
    },

    showImageModal: function() {
      var view = new ProductDetailsImageView({ model: this.model });
      view.renderModal();
    }
    
  });
});

