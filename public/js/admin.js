
define([
  'backbone',
  'cms/views/page',
  'views/admin/products',
  'bootstrap'
], function(Backbone, PageView, ProductsView) {
  $(function() {
    new PageView;
    new ProductsView;
  });
});

