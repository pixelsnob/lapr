/**
 * Youtube video form
 * 
 */
define([
  'forms/base'
], function(
  BaseForm
) {
  
  return BaseForm.extend({

    schema: {
      name: {
        type: 'Text',
        validators: [ 'required' ]
      },
      youtube_id: {
        type: 'Text',
        title: 'Youtube ID',
        validators: [ 'required' ]
      },
      start_time: {
        type: 'Text',
        validators: [ 'number' ],
        title: 'Start Time',
        help: '<em>In seconds</em>'
      },
      description: {
        type: 'TextArea',
        help: '<em>Markdown Enabled</em>'
      }

    }
    
  });
});


