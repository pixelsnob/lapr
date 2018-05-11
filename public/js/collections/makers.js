/**
 * makers collection
 * 
 */
import MakerModel from '../models/maker';

export default Backbone.Collection.extend({

  url: '/api/makers',

  model: MakerModel,

  comparator: 'name',

  initialize: function() {}
});
