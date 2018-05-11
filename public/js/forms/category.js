/**
 * product_category form
 * 
 */
import BaseForm from 'forms/base';
import ContentBlocksCollection from 'collections/content_blocks';

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
    this.fields.more_info_content_block.schema.options = new ContentBlocksCollection;
  },

  schema: {
    name: {
      type: 'Text'
    },
    more_info_content_block: {
      type: 'Select',
      title: 'More Info Content Block',
      options: []
    },
    more_info_title: {
      type: 'Text',
      title: 'More Info Title'
    },
    slug: {
      type: 'Text'
    }
  }

});


