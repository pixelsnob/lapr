/**
 * Image upload custom editor
 * 
 */
define([
  './product_image',
  'models/file/product_thumbnail'
], function(
  ImageUploadView,
  ThumbnailModel
) {
  
  return ImageUploadView.extend({
    
    file_model: ThumbnailModel
    
  });
});
