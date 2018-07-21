/**
 * product model
 * 
 */
import BaseModel from './base';

export default BaseModel.extend({

  url: function() {
    return '/instruments/item/' + (this.id || '');
  },

  initialize: function(opts) {
    if (opts && opts.id) {
      this.id = opts.id;
    }
  }/*,

  getRefs: function(ref_name) {
    const ref_ids = Array.isArray(this.get(ref_name)) ? this.get(ref_name) : [];
    const ref_collection = this.collection.refs[ref_name];
    const models = ref_ids.map(ref_id => {
      return ref_collection.findWhere({ _id: ref_id });
    });
    return new Backbone.Collection(models);
  }*/

});
