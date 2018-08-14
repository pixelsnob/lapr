
import ContentBlocksContainer from 'containers/content_blocks';
import template from 'lib/template';
import IndexComponent from 'components/index';

export default class {
  
  constructor(params, store) {
    this.params = params;
    this.store = store;
    this.$el = document.createElement('template');
  }

  render() {
    const index_component = new IndexComponent;
    this.$el.content.appendChild(index_component.render());
    const content_blocks_container = new ContentBlocksContainer(this.params, this.store, this.$el);
    content_blocks_container.render();
    return this.$el.content;
  }
}


