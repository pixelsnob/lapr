
import events from 'events/app';
import SiteSearchComponent from 'components/site_search';
import SiteSearchInputComponent from 'components/site_search_input';
import SiteSearchListComponent from 'components/site_search_list';

export default class {
  
  constructor(params, store, $el) {
    this.params = params;
    this.store = store;
    this.$el = $el || document.createElement('template');
    events.app.once('connected', this.connected.bind(this));
    this.site_search_component = new SiteSearchComponent(this.params);
    this.site_search_input_component = new SiteSearchInputComponent(this.params);
    this.selector = '.site-search';
  }

  connected($el) {
    const $site_search = $el.querySelector(this.selector);
    this.store.products.createProductsIndex();

    this.site_search_input_component.on('keydown', ev => {
      //console.log('parent keydown');
    });

    this.site_search_input_component.on('keyup', ev => {
      this.store.products.getSearchResults(ev.target.value, 100);
      const site_search_list_component = new SiteSearchListComponent({
        results: this.store.filtered_products.toJSON()
      });
      const $results_container = $site_search.querySelector(this.selector + '__results')
      $results_container.innerHTML = '';
      $results_container.appendChild(site_search_list_component.render());
      
    });
  }

  render() {
    this.$el.content.appendChild(this.site_search_component.render());
    this.$el.content.querySelector(this.selector + '__form').appendChild(
      this.site_search_input_component.render()
    );
    return this.$el.content;
  }

}


