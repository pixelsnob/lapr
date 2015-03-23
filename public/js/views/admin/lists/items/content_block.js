/**
 * content_block view
 * 
 */
define([
  './base',
  'models/content_block',
  'forms/content_block'
], function(
  ListItemBaseView,
  ContentBlockModel,
  ContentBlockForm
) {
  
  return ListItemBaseView.extend({
    
    label: 'content_block',
    
    title: 'Content Block',
    
    model: new ContentBlockModel,
    
    form_obj: ContentBlockForm
    
  });
});

