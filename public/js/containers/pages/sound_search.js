
import TagsNavContainer from 'containers/tags_nav';
import InstrumentSummariesListContainer from 'containers/instrument_summaries_list';
import InstrumentDetailsListContainer from 'containers/instrument_details_list';

export default class {
  
  constructor(context, store, $el) {
    this.context = context;
    this.store = store;
    this.$el = $el || document.createElement('template');
  }

  render() {
    const selected_tags = this.context.params.tags ? this.context.params.tags.split(',') : [];
    this.store.selected_tags.setFromArray(selected_tags);
    this.store.filtered_products.sort_mode = 'default';
    this.store.products.filterByTags();

    this.$el.innerHTML = require('views/partials/products_search.jade')({
      products_length: this.store.filtered_products.models.length,
      sort_dir: this.store.filtered_products.sort_direction
    });

    const tags_nav_container = new TagsNavContainer(
      this.context,
      this.store
    );
    
    this.$el.content.querySelector('.sidebar').appendChild(tags_nav_container.render());

    const base_path = selected_tags ? `/instruments/tags/${selected_tags}` : '/instruments/tags';

    if (this.context.params.instrument_id) {
      const instrument_details_list_container = new InstrumentDetailsListContainer({
        ...this.context,
        params: {
          ...this.context.params,
          grid_width: 8,
          base_path
        }
      }, this.store);
      this.$el.content.querySelector('.results-container').appendChild(
        instrument_details_list_container.render()
      );
    } else {
      const instrument_summaries_list_container = new InstrumentSummariesListContainer({
        ...this.context,
        params: {
          ...this.context.params,
          base_path
        }
      }, this.store);
      this.$el.content.querySelector('.results-container').appendChild(
        instrument_summaries_list_container.render()
      );
    }
    return this.$el.content;

  }
}


