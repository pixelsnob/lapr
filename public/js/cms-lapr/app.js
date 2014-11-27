
define([
  'backbone',
  'cms/views/page',
  'cms-lapr/views/products',
  'bootstrap'
], function(Backbone, PageView, ProductsView) {
  $(function() {
    new PageView;
    new ProductsView;
  });
});

