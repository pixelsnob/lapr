
import template from 'lib/template';

export default class {
  
  constructor(context, store, slots) {
    this.context = context;
    this.store = store;
    this.slots = slots;
  }

  render() {
    this.store.refs.filtered_products.reset(this.store.toJSON());
    this.store.refs.selected_categories.setFromSlug(this.context.params.category);
    this.store.filterByCategory();
    return template.render('partials/products_search', {
      products: this.store.refs.filtered_products.toJSON(),
    });
  }
}


