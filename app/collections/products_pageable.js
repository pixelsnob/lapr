/**
 * pageable products collection
 * 
 */
import backbone from 'backbone';
import ProductModel from 'models/product';
import 'backbone.paginator';

export default Backbone.PageableCollection.extend({

  model: ProductModel,

  mode: 'client',

  url: '/instruments',

  state: {
    pageSize: 100
  }

});
