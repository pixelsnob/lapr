/**
 * Base view
 * 
 */
define([
  'backbone',
  'lib/dialog'
], function(Backbone, dialog) {
  return Backbone.View.extend({
    showServerError: function(model, xhr) {
      if (typeof xhr != 'object') {
        return;
      }
      if (xhr.status == 403) {
        dialog.alert('You must be logged in to do that...');
      } else {
        dialog.alert('A server error has occurred!');
      }
    }
  });
});
