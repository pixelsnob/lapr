/**
 * products view
 * 
 */
define([
  'views/base',
  './product',
  'models/product'
], function(BaseView, ProductView, ProductModel) {
  return BaseView.extend({
    
    el: 'body',

    events: {
      'click .products .product': 'edit', 
      'click .add-product': 'add' 
    },
    
    initialize: function() {
    },

    edit: function(ev) {
      var id    = $(ev.currentTarget).parents('tr').attr('id'),
          model = new ProductModel({ id: id }),
          view  = new ProductView({ model: model }),
          obj   = this;
      this.listenTo(view, 'ready', function() {
        model.fetch({
          success: _.bind(view.renderModal, view, { mode: 'edit' }),
          error:   _.bind(obj.showServerError, this)
        });
      });
      return false;
    },

    add: function(ev) {
      var product_view = new ProductView({ model: new ProductModel });
      product_view.renderModal({ mode: 'add' });
      return false;
    }
  });
});
