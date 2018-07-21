
import template from 'lib/template';
import events from 'events/app';
import markdown from 'lib/markdown';

export default class {
  
  constructor(params, store, $el) {
    this.params = params;
    this.store = store;
    this.$el = $el || document.createElement('template');
  }

  render() {

    const product = this.params.product;

    if (!product) {
      return { error: 'product not found in params' };
    }

    this.$el.innerHTML = require('views/partials/instrument_summary.jade')({
      product,
      markdown,
      base_path: this.params.base_path
    });

    return this.$el.content;
  }
}

