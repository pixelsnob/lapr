
import ProductCategoriesNavContainer from 'containers/product_categories_nav';
import InstrumentSummariesListContainer from 'containers/instrument_summaries_list';
import InstrumentDetailsListContainer from 'containers/instrument_details_list';

export default class {
  
  constructor(params, store, $el) {
    this.params = params;
    this.store = store;
    
    this.$el = $el || document.createElement('template');
  }

  render() {
    this.store.selected_categories.setFromSlug(this.params.category);
    this.store.filtered_products.sort_mode = 'default';
    this.store.products.filterByCategory();
    
    this.$el.innerHTML = require('views/partials/products_search.jade')({
      products_length: this.store.filtered_products.models.length,
      sort_dir: this.store.filtered_products.sort_direction
    });

    const product_categories_nav = new ProductCategoriesNavContainer(
      this.params,
      this.store.product_categories
    );

    this.$el.content.querySelector('.sidebar').appendChild(product_categories_nav.render());
    
    const base_path = this.params.category ?
      `/instruments/categories/${this.params.category}` :
      '/instruments';

    if (this.params.instrument_id) {
      const instrument_details_list_container = new InstrumentDetailsListContainer({
        ...this.params,
        grid_width: 12,
        base_path
      }, this.store);
      this.$el.content.querySelector('.results-container').appendChild(
        instrument_details_list_container.render()
      );
    } else {
      const instrument_summaries_list_container = new InstrumentSummariesListContainer({
        ...this.params,
        base_path
      }, this.store);
      this.$el.content.querySelector('.results-container').appendChild(
        instrument_summaries_list_container.render()
      );
    }
    return this.$el.content;


  }
}


