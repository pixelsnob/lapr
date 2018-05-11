/**
 * tags collection
 * 
 */
import TagModel from '../models/tag';

export default Backbone.Collection.extend({

  url: '/api/tags',

  model: TagModel,

  comparator: 'name',

  initialize: function() {}
});

