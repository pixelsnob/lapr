/**
 * Main initialization file
 * 
 */
import Backbone from 'backbone';
import underscore from 'underscore';
import csrf from 'lib/backbone-csrf';
import Router from 'router';
import controller from 'controller';
import ProductsCollection from './collections/products';
import AppView from 'views/app';
  
var products = new ProductsCollection;
products.deferred = products.fetch();

// Load templates: note that require() is temporary until replacement
// jade (pug) compiler is found
require('http://127.0.0.1:3003/jade.js').then(function() {
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
      import('views/admin/app').then(AdminAppView => {
        new AdminAppView.default({
          el: app_view.$el,
          products: products
        });
      });
    }
  });

});

