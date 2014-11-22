/**
 * Audio player settings like volume and such. Saves to localStorage
 * 
 */
define([
  './base'
], function(BaseModel) {
  return BaseModel.extend({
    
    defaults: {
      volume: 66,
    },

    initialize: function() {
      this.storage = window.localStorage;
    },

    save: function() {
      if (typeof this.storage != 'undefined') {
        this.storage.setItem('player_settings', JSON.stringify(this));
      }
    },

    get: function(attr) {
      if (typeof this.storage != 'undefined' && this.storage.length) {
        var settings = this.storage.getItem('player_settings');
        settings = JSON.parse(settings);
        if (settings.hasOwnProperty(attr)) {
          return settings[attr];
        }
      } else if (this.defaults.hasOwnProperty(attr)) {
        return this.defaults[attr];
      }
    }
  });
});

