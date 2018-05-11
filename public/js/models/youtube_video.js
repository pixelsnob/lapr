/**
 * Youtube video model
 * 
 */
import BaseModel from './base';

export default BaseModel.extend({

  url: function() {
    return '/api/youtube-videos/' + (this.id || '')
  },

  initialize: function(opts) {

  },

  toString: function() {
    return this.get('name');
  },

  // Used to check video availability
  getVideoJSON: function() {
    var deferred = new $.Deferred;
    var url = 'https://www.googleapis.com/youtube/v3/videos?id=' +
      this.get('youtube_id') +
      '&key=AIzaSyAjUkPxGyadh5relom7cM9JgAAm7dLa3l8' +
      '&part=status';
    $.ajax({
      url: url,
      type: 'GET',
      cache: false,
      dataType: 'json'
    }).always(function(data) {
      // If video is valid, items array will have one object
      if (data && _.isArray(data.items) && data.items.length) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
    });
    return deferred;
  }

});
