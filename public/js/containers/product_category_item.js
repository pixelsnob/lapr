
import template from 'lib/template';
import InstrumentSummariesListContainer from 'containers/instrument_summaries_list';

import ProductsCollection from 'collections/products';

export default class {
  
  constructor(params, store) {
    this.params = params;
    this.store = store;
    this.$el = document.createElement('template');
  }

  render() {

    this.$el.innerHTML = require('views/partials/product_subcategory_item.jade')({
      product_category: this.params.product_category.toJSON()
    });

    const product_category = this.params.product_category.toJSON();
    const instrument_summaries_list_container = new InstrumentSummariesListContainer({
      ...this.params,
      //limit: 7,
      product_category,
      collection: new ProductsCollection(this.params.products), 
      base_path: `/instruments/categories/${product_category.slug}/`
    }, this.store);

    const $ul = this.$el.content.querySelector('.product-category-results');
    $ul.appendChild(instrument_summaries_list_container.render());

    return this.$el.content.cloneNode(true);
  }
}
