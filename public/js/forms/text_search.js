/**
 * Product text search form
 * 
 */
define([
  'forms/base'
], function(
  BaseForm
) {
  
  return BaseForm.extend({

    schema: {
      search: {
        type: 'Text'
      }
    }
    
  });
});


