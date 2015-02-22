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
      description: {
        type: 'TextArea',
        help: '<em>Markdown Enabled</em>'
      }

    }
    
  });
});


