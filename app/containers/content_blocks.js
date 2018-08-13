
import template from 'lib/template';
import markdown from 'lib/markdown';

export default class {
  
  constructor(params, store, $el) {
    this.params = params;
    this.store = store;
    this.$el = $el;
  }

  render() {
    const $content_blocks = this.$el.content.querySelectorAll('.content-block[data-name]');
    // Populate all content blocks found
    Array.from($content_blocks).map($content_block => {
      const content_block = this.store.content_blocks.find(content_block => {
        return $content_block.dataset.name == content_block.get('name');
      });
      if (content_block) {
        const $content = $content_block.querySelector('.content');
        if ($content && $content.childNodes.length == 0) {
          const content = content_block.get('content');
          if (content_block.get('type') == 'markdown') {
            $content.innerHTML = markdown(content);
          }
        }
      }
    });
    return this.$el.content;
  }
}

