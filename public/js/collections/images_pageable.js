/**
 * pageable images collection
 * 
 */
define([
  '../models/image',
  'backbone-paginator'
], function(
  ImageModel
) {
  return Backbone.PageableCollection.extend({
    
    url: '/api/images',

    model: ImageModel,

    mode: 'client',

    state: {
      pageSize: 50,
      perPage: 50
    },

    comparator: 'name'

  });
});
