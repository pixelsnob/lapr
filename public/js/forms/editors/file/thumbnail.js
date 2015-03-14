/**
 * Image upload custom editor
 * 
 */
define([
  './image',
  'models/file/thumbnail'
], function(
  ImageUploadView,
  ThumbnailModel
) {
  
  return ImageUploadView.extend({
    
    file_model: ThumbnailModel
    
  });
});
