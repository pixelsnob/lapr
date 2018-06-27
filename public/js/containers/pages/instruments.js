
import ProductCategoriesNavContainer from 'containers/product_categories_nav';
import InstrumentSummariesListContainer from 'containers/instrument_summaries_list';
import InstrumentDetailsListContainer from 'containers/instrument_details_list';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;

  }

  render() {
    this.store.selected_categories.setFromSlug(this.context.params.category);
    this.store.filtered_products.sort_mode = 'default';
    this.store.products.filterByCategory();

    const product_categories_nav = new ProductCategoriesNavContainer(
      this.context,
      this.store.product_categories
    );

    if (this.context.params.instrument_id) {
      return new InstrumentDetailsListContainer({
        ...this.context,
        params: {
          ...this.context.params,
          grid_width: 8,
          category: this.context.params.category
        }
      }, this.store).render();
    } else {
      return new InstrumentSummariesListContainer(this.context, this.store, {
        sidebar: product_categories_nav
      }).render();
    }
  }
}


