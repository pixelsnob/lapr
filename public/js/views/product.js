/**
 * Product item view
 * 
 */
define([
  'views/base',
  'models/product',
  'collections/makers',
  'template'
], function(
  BaseView,
  ProductModel,
  MakersCollection,
  template
) {
  
  return BaseView.extend({
    
    model: new ProductModel,
    
    makers: new MakersCollection,

    tagName: 'tr',
    
    events: {
    },

    initialize: function(opts) {
      if (opts.makers) {
        this.makers = opts.makers;
      }
      this.listenTo(this.model, 'change', this.render);
    },
    
    render: function() {
      var id      = this.model.id,
          product = this.model.toJSON(),
          obj     = this;
      product.id  = id;
      if (product.makers) {
        product.makers = product.makers.map(function(maker) {
          var maker = obj.makers.findWhere({ _id: maker });
          if (maker && maker.attributes) {
            return maker.attributes;
          }
        });
      }
      this.setElement(template.render('product_row', { product: product }));
      return this;
    }
    
  });
});

