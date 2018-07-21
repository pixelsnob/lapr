
import template from 'lib/template';

export default class {
  
  constructor(params, store, $el) {
    this.params = params;
    this.store = store;
    this.$el = $el || document.createElement('template');
  }

  render() {
    this.$el.innerHTML = require('views/partials/product_category_link.jade')({
      product_category: this.params.product_category
    });
    return this.$el.content;
  }
}
