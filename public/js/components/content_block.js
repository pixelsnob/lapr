
import template from 'lib/template';
import events from 'events/app';

export default class {
  
  constructor(context, store, $el) {
    this.context = context;
    this.store = store;
    this.$el = $el || document.createElement('template');
    //this.events = events;
  }
  
  render() {
    const content_block = this.store.content_blocks.find(content_block => {
      return content_block.id == this.context.params.id;
    });
    this.$el.innerHTML = template.render('partials/product', {
    });
    return this.$el.content;
  }
}
