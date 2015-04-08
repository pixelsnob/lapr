/**
 * maker view
 * 
 */
define([
  './base',
  'models/image',
  'forms/image'
], function(
  ListItemBaseView,
  ImageModel,
  ImageForm
) {
  
  return ListItemBaseView.extend({
    label: 'image',
    title: 'Image',
    
    model: new ImageModel,
    
    form_obj: ImageForm
    
  });
});

