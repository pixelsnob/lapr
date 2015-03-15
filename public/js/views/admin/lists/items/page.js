/**
 * page view
 * 
 */
define([
  './base',
  'models/page',
  'forms/page'
], function(
  ListItemBaseView,
  PageModel,
  PageForm
) {
  
  return ListItemBaseView.extend({
    label: 'page',
    title: 'Page',
    
    model: new PageModel,
    
    form_obj: PageForm
    
  });
});

