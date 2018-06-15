
import template from 'lib/template';
import events from 'events/app';
import markdown from 'lib/markdown';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
    events.once('connected', this.connected.bind(this));
  }
  
  connected($el) {
    this.render($el);//<
    // Add "app:navigate" action to links in rendered content blocks
    Array.from($el.querySelectorAll('.content-block .content a[href]')).map($el => {
      $el.setAttribute('data-action', 'app:navigate');
    });
  }

  render($el) {
    const $content_blocks = $el.querySelectorAll('.content-block[data-name]');
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
    return null;
  }
}