
import IndexComponent from 'components/index';
import ContentBlockContainer from 'containers/content_block';
import markdown from 'lib/markdown';

export default class {
  
  constructor(params, store) {
    this.params = params;
    this.store = store;
    this.$el = document.createElement('template');
  }

  render() {
    const index_component = new IndexComponent;
    this.$el.content.appendChild(index_component.render());

    const $content_blocks = this.$el.content.querySelectorAll('.content-block[data-name]');
    Array.from($content_blocks).forEach($content_block => {
      const content_block_container = new ContentBlockContainer({
        name: $content_block.dataset.name
      }, this.store);
      $content_block.querySelector('.content').innerHTML = '';
      $content_block.querySelector('.content').appendChild(content_block_container.render());
    });

    return this.$el.content.cloneNode(true);
  }
}


