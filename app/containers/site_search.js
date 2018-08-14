
import events from 'events/app';
import SiteSearchComponent from 'components/site_search';
import SiteSearchInputComponent from 'components/site_search_input';
import SiteSearchListComponent from 'components/site_search_list';

export default class {
  
  constructor(params, store, $el) {
    this.params = params;
    this.store = store;
    this.$el = $el || document.createElement('template');
    this.selector = '.site-search';
    events.app.once('connected', this.connected, this);

    this.site_search_component = new SiteSearchComponent(this.params);
    this.site_search_input_component = new SiteSearchInputComponent(this.params);
    this.site_search_list_component = new SiteSearchListComponent(this.params);
  }

  connected($el) {
    const $container = $el.querySelector(this.selector);
    this.store.products.createProductsIndex();

    const $results_container = $container.querySelector(this.selector + '__results');

    // mousedown runs before blur: make sure dropdown doesn't close when clicking on child links
    // by removing focus() from <input>
    this.site_search_list_component.on('mousedown', ev => {
      ev.preventDefault();
    });

    this.site_search_input_component.on('blur', ev => {
      ev.target.value = '';
      $results_container.innerHTML = '';
    });

    this.site_search_input_component.on('keyup', ev => {
      this.store.products.getSearchResults(ev.target.value, 100);
      $results_container.innerHTML = '';
      this.site_search_list_component.setResults(this.store.filtered_products.toJSON());
      $results_container.appendChild(this.site_search_list_component.render());
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


