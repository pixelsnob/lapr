
import ProductCategoriesNavContainer from 'containers/product_categories_nav';
import ProductCategoryInstrumentsContainer from 'containers/product_category_instruments'; 
import InstrumentSummariesListContainer from 'containers/instrument_summaries_list';
import InstrumentDetailsListContainer from 'containers/instrument_details_list';

import events from 'events/app';

export default class {
  
  constructor(params, store, $el) {
    this.params = params;
    this.store = store;
    
    this.$el = $el || document.createElement('template');
    
    events.on('connected', this.connected.bind(this));
  }

  connected($el) {
    window.scrollTo(0, 0);
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
      `/instruments/categories/${this.params.category}/` :
      '/instruments/';

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
      // move this junk to model
      const selected_product_category = this.store.selected_categories.models[0];
      if (!selected_product_category) {
        return { error: 'No product category selected!' };
      }
      var child_categories = this.store.product_categories.models.filter(product_category => {
        return product_category.get('parent') == selected_product_category.id;
      });

      if (!child_categories.length) {
        child_categories = [ selected_product_category ];
      }

      const product_subcategory_instruments_container = new ProductCategoryInstrumentsContainer({ //"summaries" in name
        ...this.params,
        product_categories: child_categories
      }, this.store);
      this.$el.content.querySelector('.results-container').appendChild(
        product_subcategory_instruments_container.render()
      );

      return this.$el.content;

      /*if (this.store.selected_categories.models.length) {

        // move this junk to model
        const product_category_id = this.store.selected_categories.models[0].id;
        const child_categories = this.store.product_categories.models.filter(product_category => {
          return product_category.get('parent') == product_category_id;
        });

        if (child_categories.length) {
          const product_subcategory_instruments_container = new ProductSubcategoryInstrumentsContainer({
            ...this.params,
            product_categories: child_categories
          }, this.store);
          this.$el.content.querySelector('.results-container').appendChild(
            product_subcategory_instruments_container.render()
          );
          return this.$el.content;
        }
      }

      const instrument_summaries_list_container = new InstrumentSummariesListContainer({
        ...this.params,
        collection: this.store.filtered_products,
        base_path
      }, this.store);

      this.$el.content.querySelector('.results-container').appendChild(
        instrument_summaries_list_container.render()
      );*/
    }
    return this.$el.content;


  }
}


