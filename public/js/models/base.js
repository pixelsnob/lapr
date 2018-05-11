/**
 * App base model
 * 
 */
import Backbone from 'backbone';

export default Backbone.Model.extend({

  idAttribute: '_id',

  logError: function(message) {
    $.ajax({
      url: '/api/errors',
      type: 'POST',
      cache: false,
      dataType: 'json',
      data: {
        message: message,
        json: JSON.stringify(this.attributes)
      }
    });
  }

});

