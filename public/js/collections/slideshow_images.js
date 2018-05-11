/**
 * Slideshow images collection
 * 
 */
import ContentBlockModel from '../models/image';

export default Backbone.Collection.extend({

  url: '/api/slideshow-images',

  comparator: 'name',

  initialize: function() {}
});
