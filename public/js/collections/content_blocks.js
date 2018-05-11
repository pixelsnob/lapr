/**
 * content_blocks collection
 * 
 */
import ContentBlockModel from '../models/content_block';
export default Backbone.Collection.extend({

  url: '/api/content-blocks',

  model: ContentBlockModel,

  comparator: 'name',

  initialize: function() {}
});
