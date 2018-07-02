
import template from 'lib/template';
import events from 'events/app';
//import ProductsTextSearchItemComponent from 'components/products_text_search_item';

export default class {
  
  constructor(context, store, $el) {
    this.context = context;
    this.store = store;
    this.$el = $el || document.createElement('template');
  }
  
  render() {
    this.$el.innerHTML = require('views/partials/products_text_search_item.jade')({
      product: this.context.params.product.toJSON([ 'makers' ]),
    });
    return this.$el.content;
  }
}


