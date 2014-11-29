
define([
  'backbone',
  'lib/csrf',
  //'views/app',
  'bootstrap'
], function(Backbone, csrf, AppView) {
  $(function() {
    new AppView;
    Backbone.history.start({
      pushState: true,
      hashChange: false,
      silent: false 
    });
  });
});

