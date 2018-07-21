/**
 * images collection
 * 
 */
import ImageModel from '../models/image';

export default Backbone.Collection.extend({

  url: '/api/images',

  model: ImageModel,

  comparator: 'name',

  initialize: function() {}
});

