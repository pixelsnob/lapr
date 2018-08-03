/** 
 * Adds a csrf header to each request
 * 
 */
import Backbone from 'backbone';
import csrf from 'lib/csrf';

// Override Backbone.sync to add csrf-token header
Backbone.sync = (function(original) {
  return function(method, model, options) {
    options.beforeSend = function(xhr) {
      xhr.setRequestHeader('X-Csrf-Token', csrf.getParam());
    };
    return original(method, model, options);
  };
})(Backbone.sync);

