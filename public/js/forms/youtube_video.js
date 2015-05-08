/**
 * Youtube video form
 * 
 */
define([
  'forms/base',
  'forms/editors/text_number'
], function(
  BaseForm,
  TextNumberEditor
) {
  
  return BaseForm.extend({

    initialize: function(opts) {
      this.schema.name.validators = [
        'required',
        {
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
      youtube_id: {
        type: 'Text',
        title: 'Youtube ID',
        validators: [ 'required' ]
      },
      start_time: {
        type: TextNumberEditor,
        validators: [ 'number' ],
        title: 'Start Time',
        help: '<em>In seconds</em>'
      },
      end_time: {
        type: TextNumberEditor,
        validators: [ 'number' ],
        title: 'End Time',
        help: '<em>In seconds</em>'
      },
      description: {
        type: 'TextArea',
        help: '<em>Markdown Enabled</em>'
      }

    }
    
  });
});


