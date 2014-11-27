/**
 * 
 */
define([
  'cms/views/base',
  './product'
], function(BaseView, ProductView) {
  return BaseView.extend({
    
    el: 'body',

    events: {
      'click .products .product': 'edit' 
    },
    
    initialize: function() {
    },

    edit: function(ev) {
      var id = $(ev.currentTarget).parents('tr').attr('id');
      var product_view = new ProductView({ id: id });
      product_view.on('ready', function() {
        product_view.renderModal();
      });
      return false;
    }
  });
});
