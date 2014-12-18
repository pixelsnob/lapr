/**
 * products collection
 * 
 */
define([
  '../models/product',
  '../models/maker'
], function(ProductModel, MakerModel) {
  return Backbone.Collection.extend({
    
    url: '/products',

    model: ProductModel,

    comparator: 'name',

    initialize: function(models, opts) {
      this.refs = opts.refs;
      var obj = this;
      // Add event handlers for each reference collection
      Object.keys(this.refs).forEach(function(ref) {
        obj.listenTo(obj.refs[ref], 'change', _.bind(obj.trigger, obj, 'change-ref'));
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
    }

  });
});
