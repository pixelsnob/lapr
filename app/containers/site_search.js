
import events from 'events/app';
import SiteSearchComponent from 'components/site_search';
import SiteSearchInputComponent from 'components/site_search_input';
import SiteSearchListComponent from 'components/site_search_list';

export default class {
  
  constructor(params, store) {
    this.params = params;
    this.store = store;
    this.$el = document.createElement('template');

    this.site_search_component = new SiteSearchComponent(this.params);

    this.site_search_input_component = new SiteSearchInputComponent({
      onKeyup: this.onInputKeyup.bind(this),
      onKeydown: this.onInputKeydown.bind(this),
      onBlur: this.onInputBlur.bind(this)
    });

    this.site_search_list_component = new SiteSearchListComponent(this.params);
  }

  onInputKeyup(ev) {
    this.store.products.getSearchResults(ev.target.value, 10);
    this.site_search_list_component.setResults(this.store.filtered_products.toJSON());
    this.site_search_component.setResults(this.site_search_list_component.render());
  }

  onInputKeydown(ev) {
  }

  onInputBlur(ev) {
    this.site_search_list_component.close();
    this.site_search_input_component.reset();
  }

  render() {
    this.site_search_component.setInput(this.site_search_input_component.render());
    this.$el.content.appendChild(this.site_search_component.render());
    return this.$el.content.cloneNode(true);
  }
  
}


