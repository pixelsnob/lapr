/**
 * tag_category form
 * 
 */
import BaseForm from 'forms/base';
import TagCategories from 'collections/tag_categories';

export default BaseForm.extend({

  initialize: function(opts) {
    this.schema.name.validators = [
      'required', {
        type: 'unique',
        name: 'name',
        model: this.model,
        collection: opts.collection
      }
    ];
    BaseForm.prototype.initialize.apply(this, arguments);
  },

  schema: {
    name: {
      type: 'Text'
    },
    sort_order: {
      title: 'Sort Order',
      type: 'Text',
      validators: []
    }
  }

});


