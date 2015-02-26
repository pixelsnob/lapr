/**
 * users collection
 * 
 */
define([
  '../models/user'
], function(UserModel) {
  return Backbone.Collection.extend({
    
    url: '/api/users',

    model: UserModel,

    comparator: 'name',

    initialize: function() {
    }
  });
});
