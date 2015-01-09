/**
 * filtered_products collection
 * 
 */
define([
  '../models/product',
  '../models/maker',
  'backbone-paginator'
], function(ProductModel, MakerModel) {
  return Backbone.PageableCollection.extend({
    
    url: '/products',

    model: ProductModel,

    comparator: 'name',

    mode: 'client',

    state: {
      firstPage: 0,
      currentPage: 0,
      pageSize: 30
    }/*,
 
    initialize: function(models, opts) {
      this.refs = (opts && opts.refs) || {};
      var obj = this;
      // Add event handlers for each reference collection
      Object.keys(this.refs).forEach(function(ref) {
        obj.listenTo(obj.refs[ref], 'change remove', _.bind(obj.trigger, obj, 'change-ref'));
        // Remove id from parent collection when ref is removed
        obj.listenTo(obj.refs[ref], 'remove', function(model) {
          if (model instanceof MakerModel) {
            obj.removeRef(model, 'makers');
          }
        });
      });
    },

    removeRef: function(model, coll_name) {
      this.forEach(function(product) {
        var ids = product.get(coll_name);
        if (_.isArray(ids) && _.contains(ids, model.id)) {
          product.set(coll_name, _.without(ids, model.id));
        }
      });
    }*/

  });
});
