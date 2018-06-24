
import template from 'lib/template';
import events from 'events/app';

export default class {
  
  constructor(context, store, $el) {
    this.context = context;
    this.store = store;
    this.$el = $el || document.createElement('template');
  }
  
  render() {
    this.$el.innerHTML = require('views/partials/product.jade')({
      product: this.context.params.product,
      user: null // <<<<<<<<<<replace me
    });
    return this.$el.content;
  }
}
