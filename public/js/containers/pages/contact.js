
import ContentBlocksContainer from 'containers/content_blocks';
import ContactContainer from 'containers/contact';

export default class {
  
  constructor(params, store) {
    this.params = params;
    this.store = store;
  }

  onMount($el) {
    const content_blocks_container = new ContentBlocksContainer(this.params, this.store);
    content_blocks_container.render();
  }

  render() {
    return (new ContactContainer(this.params, this.store)).render();
  }
}


