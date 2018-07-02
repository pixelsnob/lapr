
import ContentBlocksContainer from 'containers/content_blocks';
import IndexContainer from 'containers/index';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
  }

  render() {
    new ContentBlocksContainer(this.context, this.store);
    return (new IndexContainer(this.context, this.store)).render();
  }
}


