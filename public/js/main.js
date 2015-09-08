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
  
  var products = new ProductsCollection;
  products.deferred = products.fetch();

  // Run on dom ready
  $(function() {

    var app_view = new AppView({ products: products });
    app_view.render();

    new Router({ controller: controller(app_view) });
    
    if (Backbone.history && !Backbone.History.started) {
      if (!(window.history && history.pushState)) {
        Backbone.history.start({ pushState: false, silent: true });
        var fragment = window.location.pathname.substr(
          Backbone.history.options.root.length);
        Backbone.history.navigate(fragment, { trigger: true });
      } else {
        Backbone.history.start({ pushState: true });
      }
    }
 
    if (window.lapr.user) {
      require([ 'views/admin/app' ], function(AdminApp) {
        new AdminApp({
          el:       app_view.$el,
          products: products
        });
      });
    }
  });
});

