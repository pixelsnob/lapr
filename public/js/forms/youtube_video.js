/**
 * Youtube video form
 * 
 */
define([
  'backbone',
  'backbone-forms'
], function(
) {
  
  return Backbone.Form.extend({

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


