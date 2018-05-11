/**
 * product_type collection
 * 
 */
import ProductTypeModel from '../models/product_type';

export default Backbone.Collection.extend({

  url: '/api/product-types',

  model: ProductTypeModel,

  comparator: 'name',

  initialize: function() {}
});
