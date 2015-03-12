/**
 * pageable products collection
 * 
 */
define([
  'backbone',
  'backbone-paginator'
], function(
  backbone
) {
  return Backbone.PageableCollection.extend({
    
    mode: 'client',

    state: { pageSize: 100  }

  });
});
