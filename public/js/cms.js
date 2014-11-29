
define([
  'backbone',
  'cms/views/page',
  'views/products',
  'bootstrap'
], function(Backbone, PageView, ProductsView) {
  $(function() {
    new PageView;
    new ProductsView;
  });
});

