
define([
  'backbone',
  'cms-lib/views/page',
  'cms/views/products',
  'bootstrap'
], function(Backbone, PageView, ProductsView) {
  $(function() {
    new PageView;
    new ProductsView;
  });
});

