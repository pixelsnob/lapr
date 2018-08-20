
import EventEmitter from 'events';
import events from 'events/app';
import SiteSearchListItemComponent from 'components/site_search_list_item';

export default class {
  
  constructor(params) {
    this.params = params;
    this.$el = document.createElement('template');
    this.site_search_list_items = [];
  }

  setResults(results) {
    this.results = results;
  }

  onListItemClick(ev) {
    console.log('navigate to product!');  
  }

  render() {
    this.$el.innerHTML = require('views/partials/site_search_list.jade')();
    this.results.forEach(item => {
      const site_search_list_item = new SiteSearchListItemComponent({
        item,
        onMousedown: ev => {
          // Prevent click from stealing focus() from search input
          ev.preventDefault();
        },
        onClick: ev => {
          this.onListItemClick(ev);
        }
      });
      this.$el.content.querySelector('.site-search__list').appendChild(
        site_search_list_item.render()
      );
      this.site_search_list_items.push(site_search_list_item);
    });
    return this.$el.content.cloneNode(true);
  }

  close() {
    this.site_search_list_items.forEach(item => {
      item.close();
    });
    this.site_search_list_items = [];
  }

}


