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
  getPublishedVideos: function() {
    return new Promise((resolve, reject) => {
      var url = 'https://www.googleapis.com/youtube/v3/videos?id=' +
        this.get('youtube_id') + '&key=AIzaSyAjUkPxGyadh5relom7cM9JgAAm7dLa3l8' +
        '&part=status&t=' + (new Date).getTime();
      var xhr = new XMLHttpRequest;
      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            var response = JSON.parse(xhr.response);
          } catch (err) {
            return reject(err);
          }
          // If video is valid, items array will have one object
          if (response && Array.isArray(response.items)) {
            resolve(response.items);
          } else {
            reject(new Error('Invalid response'));
          }
        }
      };
      xhr.onerror = reject;
      xhr.open('GET', url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send();
    });
  }

});
