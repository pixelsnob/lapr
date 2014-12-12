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
    
    model: new ProductModel,

    tagName: 'tr',
    
    events: {
    },

    initialize: function(opts) {
      this.listenTo(this.model, 'change', this.render);
    },
    
    render: function() {
      var id      = this.model.id,
          product = this.model.toJSON();
      product.id  = id;
      this.setElement(template.render('product_row', { product: product }));
      return this;
    }

  });
  
});
