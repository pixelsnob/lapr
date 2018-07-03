
import ContentBlocksContainer from 'containers/content_blocks';
import IndexContainer from 'containers/index';
import events from 'events/app';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
  }

  onMount($el) {
    const content_blocks_container = new ContentBlocksContainer(this.context, this.store);
    content_blocks_container.render();
  }

  render() {
    return (new IndexContainer(this.context, this.store)).render();
  }
}


