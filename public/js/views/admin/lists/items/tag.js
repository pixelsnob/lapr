/**
 * tag view
 * 
 */
define([
  './base',
  'models/tag',
  'forms/tag'
], function(
  ListItemBaseView,
  TagModel,
  TagForm
) {
  
  return ListItemBaseView.extend({
    label: 'tag',
    title: 'Tag',
    
    model: new TagModel,
    
    form_obj: TagForm

  });

});

