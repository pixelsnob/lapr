/**
 * content_blocks view
 * 
 */
import ListBaseView from './base';
import ContentBlockView from './items/content_block';

export default ListBaseView.extend({
  view: ContentBlockView,
  title: 'Content Blocks'
});

