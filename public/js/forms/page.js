/**
 * page form
 * 
 */
define([
  'forms/base',
  'collections/pages'
], function(
  BaseForm,
  PagesCollection
) {
  
  return BaseForm.extend({

    initialize: function(opts) {
      this.schema.path.validators = [
        'required',
        {
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
        validators: [ 'required' ]
      },
      description: {
        type: 'Text',
        validators: [ ]
      },
      view: {
        type: 'Text',
        validators: [ ]
      }/*,
      content_blocks: {
        type: 'Text',
        validators: [ 'required' ]
      }*/
    }
    
  });
});


