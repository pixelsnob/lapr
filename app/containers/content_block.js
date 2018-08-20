
import ContentBlockComponent from 'components/content_block';
//import markdown from 'lib/markdown';

export default class {

  constructor(params, store) {
    this.params = params;
    this.store = store;
    this.$el = document.createElement('template');
  }

  render() {
    // Matches a content block by id or name fields
    const content_block = this.store.content_blocks.find(content_block => {
      return this.params.name == content_block.get('name') || this.params.id == content_block.id;
    });
    if (content_block) {
      const content_block_component = new ContentBlockComponent({
        content_block: content_block.toJSON()
      });
      this.$el.content.appendChild(content_block_component.render());
    }
    return this.$el.content.cloneNode(true);
  }
}

