
import template from 'lib/template';

export default class {
  
  constructor(context, store, $el) {
    this.context = context;
    this.store = store;
    this.$el = $el || document.createElement('template');
  }

  render() {
    this.$el.innerHTML = require('views/partials/product_category_link.jade')({
      product_category: this.context.params.product_category
    });
    return this.$el.content;
  }
}
