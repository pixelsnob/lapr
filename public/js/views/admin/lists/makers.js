/**
 * makers view
 * 
 */
import ListBaseView from './base';
import MakerView from './items/maker';

export default ListBaseView.extend({
  view: MakerView,
  title: 'Makers'
});

