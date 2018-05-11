/**
 * tag_categories collection
 * 
 */
import TagCategoryModel from '../models/tag_category';

export default Backbone.Collection.extend({

  url: '/api/tag-categories',

  model: TagCategoryModel,

  comparator: 'sort_order',

  initialize: function() {}
});
