/**
 * makers view
 * 
 */
define([
  './base',
  './items/maker'
], function(
  ListBaseView,
  MakerView
) {

  return ListBaseView.extend({
    view: MakerView,
    title: 'Makers'
  });
    
});

