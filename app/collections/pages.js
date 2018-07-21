/**
 * pages collection
 * 
 */
import PageModel from '../models/page';

export default Backbone.Collection.extend({

  url: '/api/pages',

  model: PageModel,

  comparator: 'name',

  initialize: function() {}
});
