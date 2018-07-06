
import template from 'lib/template';
import events from 'events/app';

export default class {
  
  constructor(params, store, $el) {
    this.params = params;
    this.store = store;
    this.$el = $el || document.createElement('template');
  }
  
  render() {
    this.$el.innerHTML = require('views/partials/products_text_search_item.jade')({
      product: this.params.product.toJSON([ 'makers' ]),
    });
    return this.$el.content;
  }
}


