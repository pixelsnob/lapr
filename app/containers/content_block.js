
import template from 'lib/template';
import events from 'events/app';

export default class {
  
  constructor(params, store, $el) {
    this.params = params;
    this.store = store;
    this.$el = $el || document.createElement('template');
    //this.events = events;
  }
  
  render() {
    const content_block = this.store.content_blocks.find(content_block => {
      return content_block.id == this.params.id;
    });
    this.$el.innerHTML = require('views/partials/product.jade');
    return this.$el.content;
  }
}
