/**
 * Product item view
 * 
 */
define([
  'views/base',
  'models/product',
  'template'
], function(
  BaseView,
  ProductModel,
  template
) {
  
  return BaseView.extend({
    
    //tagName: 'li',
    
    events: {
      'click .close':  'closeModal'
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
      console.log(product);
      this.setElement(template.render('product_details', { product: product }));
      return this;
    },
    
    renderModal: function(opts) {
      this.render();
      this.$el.modal();
    },

    closeModal: function() {
      this.$el.modal('hide');
      return false;
    }
    
  });
});

