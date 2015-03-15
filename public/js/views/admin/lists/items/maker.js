/**
 * maker view
 * 
 */
define([
  './base',
  'models/maker',
  'forms/maker'
], function(
  ListItemBaseView,
  MakerModel,
  MakerForm
) {
  
  return ListItemBaseView.extend({
    label: 'maker',
    title: 'Maker',
    
    model: new MakerModel,
    
    form_obj: MakerForm
    
  });
});

