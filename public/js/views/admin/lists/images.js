/**
 * images view
 * 
 */
define([
  './base',
  './items/image'
], function(
  ListBaseView,
  ImageView
) {

  return ListBaseView.extend({
    view: ImageView,
    title: 'Images'
  });
    
});

