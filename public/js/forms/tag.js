/**
 * tag_category form
 * 
 */
import TagCategories from 'collections/tag_categories';
import BaseForm from 'forms/base';

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
    category: {
      title: 'Tag Category',
      type: 'Select',
      options: new TagCategories,
      validators: ['required']
    },
    slug: {
      title: 'Slug',
      type: 'Text',
      validators: []
    }
  }

});


