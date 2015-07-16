/**
 * Main initialization file
 * 
 */
define([
  'backbone',
  'lib/csrf',
  'router',
  'controller',
  'collections/products',
  'views/app',
  'bootstrap',
  'lib/view_mixin'
], function(
  Backbone,
  csrf,
  Router,
  controller,
  ProductsCollection,
  AppView
) {
  
  //$(function() {
  var products = new ProductsCollection;
  products.deferred = products.fetch();

  var app_view = new AppView({ products: products });
  app_view.render();

  new Router({ controller: controller(app_view) });
  
  Backbone.history.start({
    pushState: true,
    hashChange: false,
    silent: false 
  });

  if (window.lapr.user) {
    require([ 'views/admin/app' ], function(AdminApp) {
      new AdminApp({
        el:       app_view.$el,
        products: products
      });
    });
  }
  //});
});

