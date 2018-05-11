/**
 * images view
 * 
 */
import ListBaseView from './base';
import ImageView from './items/image';

export default ListBaseView.extend({
  view: ImageView,
  title: 'Images'
});

