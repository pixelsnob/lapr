
import TagsNavContainer from 'containers/tags_nav';
import InstrumentSummariesListContainer from 'containers/instrument_summaries_list';
import InstrumentDetailsListContainer from 'containers/instrument_details_list';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;

  }

  render() {
    const selected_tags = this.context.params.tags ? this.context.params.tags.split(',') : [];
    this.store.selected_tags.setFromArray(selected_tags);
    this.store.filtered_products.sort_mode = 'default';
    this.store.products.filterByTags();

    const tags_nav = new TagsNavContainer(this.context, this.store);
    const instruments_container = new InstrumentSummariesListContainer(this.context, this.store, {
      sidebar: tags_nav
    });
    return instruments_container.render();
  }
}


