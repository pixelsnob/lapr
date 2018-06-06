
import diffhtml from 'diffhtml';
import template from 'lib/template';
import navigate from 'navigate';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
  }

  render() {
    this.store.refs.filtered_products.reset(this.store.toJSON());
    this.store.refs.selected_categories.setFromSlug(this.context.params.category);
    this.store.filterByCategory();
    return template.render('partials/products_search', {
      products: this.store.refs.filtered_products.toJSON(),
      product_categories: this.store.refs.product_categories.toJSON()
    });
  }
}


