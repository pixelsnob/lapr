/**
 * pages view
 * 
 */
import ListBaseView from './base';
import PageView from './items/page';

export default ListBaseView.extend({
  view: PageView,
  title: 'Pages'

});

