
import ContentBlocksContainer from 'containers/content_blocks';
import ContactContainer from 'containers/contact';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
  }

  render() {
    new ContentBlocksContainer(this.context, this.store);
    return (new ContactContainer(this.context, this.store)).render();
  }
}


