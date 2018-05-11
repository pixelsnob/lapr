/**
 * users collection
 * 
 */
import UserModel from '../models/user';

export default Backbone.Collection.extend({

  url: '/api/users',

  model: UserModel,

  comparator: 'name',

  initialize: function() {}
});
