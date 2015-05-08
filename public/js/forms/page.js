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
        type: 'TextArea',
        validators: [ ]
      },
      view: {
        type: 'Text',
        validators: [ ]
      }
    }
    
  });
});


