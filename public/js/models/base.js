/**
 * App base model
 * 
 */
import Backbone from 'backbone';

export default Backbone.Model.extend({

  idAttribute: '_id',
  
  // Populate refs if an array of ref names is provided
  toJSON: function(ref_names = []) {
    const model_to_json = Backbone.Model.prototype.toJSON.apply(this, arguments);
    if (!ref_names.length) {
      return model_to_json;
    }
    ref_names.forEach(ref_name => {
      if (Array.isArray(model_to_json[ref_name])) {
        const ref_ids = model_to_json[ref_name];
        model_to_json[ref_name] = ref_ids.map(ref_id => {
          const refs = this.collection.refs[ref_name].find(ref => {
            return ref_id == ref.id;
          });
          return refs.toJSON();
        });
      }
    });
    return model_to_json;
  },

  logError: function(message) {
    /*$.ajax({
      url: '/api/errors',
      type: 'POST',
      cache: false,
      dataType: 'json',
      data: {
        message: message,
        json: JSON.stringify(this.attributes)
      }
    });*/
  }

});

