/**
 * product_categories collection
 * 
 */
import ProductCategoryModel from '../models/product_category';

export default Backbone.Collection.extend({

  url: '/api/categories',

  model: ProductCategoryModel,

  comparator: 'name',

  initialize: function() {}
});
