
define([
  'backbone',
  //'cms/views/page',
  'views/admin/products',
  'bootstrap',
  'lib/view_mixin'
], function(Backbone,  ProductsView) {
  $(function() {
    new ProductsView;
  });
});

