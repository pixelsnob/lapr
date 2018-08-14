

import SplashLayoutContainer from 'containers/layout/splash';
//import TagsNavContainer from 'containers/tags_nav';
//import InstrumentSummariesListContainer from 'containers/instrument_summaries_list';
//import InstrumentDetailsListContainer from 'containers/instrument_details_list';

import events from 'events/app';

export default class {
  
  constructor(params, store) {
    this.params = params;
    this.store = store;
    this.$el = document.createElement('template');

    events.app.on('connected', this.connected.bind(this));
  }

  connected($el) {
    window.scrollTo(0, 0);
  }

  render() {
    //const index_container = new IndexContainer(this.params, this.store);
    const splash_layout_container = new SplashLayoutContainer(this.params, this.store);
    this.$el.content.appendChild(splash_layout_container.render());
    //this.$el.content.querySelector('.content-main').appendChild(index_container.render());
    return this.$el.content;
    /*const selected_tags = this.params.tags ? this.params.tags.split(',') : [];

    this.store.selected_tags.setFromArray(selected_tags);
    this.store.filtered_products.sort_mode = 'default';
    this.store.products.filterByTags();

    this.$el.innerHTML = require('views/partials/products_search.jade')({
      products_length: this.store.filtered_products.models.length,
      sort_dir: this.store.filtered_products.sort_direction
    });

    const tags_nav_container = new TagsNavContainer(
      this.params,
      this.store
    );
    
    this.$el.content.querySelector('.sidebar').appendChild(tags_nav_container.render());

    const base_path = selected_tags.length ? `/instruments/tags/${selected_tags}/` :
          '/instruments/tags/all/';

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
        base_path,
        collection: this.store.filtered_products
      }, this.store);
      this.$el.content.querySelector('.results-container').appendChild(
        instrument_summaries_list_container.render()
      );
    }*/

  }
}


