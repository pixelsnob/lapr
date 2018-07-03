
import ContentBlocksContainer from 'containers/content_blocks';
import ContactContainer from 'containers/contact';

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
    return (new ContactContainer(this.context, this.store)).render();
  }
}


