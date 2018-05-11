/**
 * page form
 * 
 */
import BaseForm from 'forms/base';
import PagesCollection from 'collections/pages';

export default BaseForm.extend({

  initialize: function(opts) {
    this.schema.path.validators = [
      'required', {
        type: 'unique',
        name: 'path',
        model: this.model,
        collection: opts.collection
      }
    ];
    BaseForm.prototype.initialize.apply(this, arguments);
  },

  schema: {
    path: {
      type: 'Text'
    },
    title: {
      type: 'Text',
      validators: ['required']
    },
    description: {
      type: 'TextArea',
      validators: []
    },
    view: {
      type: 'Text',
      validators: []
    }
  }

});


