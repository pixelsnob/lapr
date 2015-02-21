/** 
 * Adds a csrf header to each request
 * 
 */
define([ 'backbone' ], function(Backbone) {
  // Override Backbone.sync to add csrf-token header
  Backbone.sync = (function(original) {
    return function(method, model, options) {
      options.beforeSend = function(xhr) {
        var csrf = $('meta[name=csrf-param]').attr('content');
        xhr.setRequestHeader('X-Csrf-Token', csrf);
      };
      return original(method, model, options);
    };
  })(Backbone.sync);
});

