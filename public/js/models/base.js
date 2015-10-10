/**
 * App base model
 * 
 */
define([
  'backbone'
], function(Backbone) {
  return Backbone.Model.extend({
    
    idAttribute: '_id',

    logError: function(message, json) {
      var url = '/';
      $.ajax({
        url: '/api/errors',
        type: 'POST',
        cache: false,
        dataType: 'json',
        data: { message: message }
      });
    }

  });
});

