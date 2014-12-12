
define([
  'backbone',
  'lib/csrf',
  'router',
  'bootstrap'
], function(Backbone, csrf, Router) {
  $(function() {
    //new AppView;
    new Router;
    Backbone.history.start({
      pushState: true,
      hashChange: false,
      silent: true 
    });
  });
});

