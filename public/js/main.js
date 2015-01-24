
define([
  'backbone',
  'lib/csrf',
  'router',
  'views/app',
  'bootstrap',
  'lib/view_mixin'
], function(Backbone, csrf, Router, AppView) {
  //return;
  $(function() {
    var app_view = new AppView;
    new Router({ app_view: app_view });
    Backbone.history.start({
      pushState: true,
      hashChange: false,
      silent: false 
    });
  });
});

