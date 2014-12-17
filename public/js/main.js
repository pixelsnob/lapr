
define([
  'backbone',
  'lib/csrf',
  'router',
  'bootstrap',
  'lib/view_mixin'
], function(Backbone, csrf, Router) {
  $(function() {
    new Router;
    Backbone.history.start({
      pushState: true,
      hashChange: false,
      silent: false 
    });
  });
});

