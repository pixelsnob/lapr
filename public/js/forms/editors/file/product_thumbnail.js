/**
 * Image upload custom editor
 * 
 */
import ImageUploadView from './product_image';
import ThumbnailModel from 'models/file/product_thumbnail';

export default ImageUploadView.extend({

  file_model: ThumbnailModel

});
