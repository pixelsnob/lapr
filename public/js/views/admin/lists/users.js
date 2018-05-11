/**
 * Users view
 * 
 */
import ListBaseView from './base';
import UserView from './items/user';

export default ListBaseView.extend({
  view: UserView,
  title: 'Users'
});
