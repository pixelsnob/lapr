/**
 * App base model
 * 
 */
define([
  'backbone'
], function(Backbone) {
  return Backbone.Model.extend({
    idAttribute: '_id',
    saved: {},
    storage: window.localStorage,
    initialize: function() {
      // Save a copy fetched from the server for comparisons, etc.
      this.listenTo(this, 'sync', function(model) {
        this.saved = _.clone(model.attributes);
      });
    },
    saveLocal: function() {
      if (typeof this.storage != 'undefined') {
        this.storage.setItem(this.url, JSON.stringify(this));
      }
    },
    revert: function() {
      this.set(this.saved);
    },
    hasChanged: function() {
      return !_.isEqual(this.saved, this.attributes);
    }
  });
});

