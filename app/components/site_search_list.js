
import EventEmitter from 'events';
import events from 'events/app';

export default class extends EventEmitter {
  
  constructor(params) {
    super();
    this.params = params;
    this.$el = document.createElement('template');
    this.selector = '.site-search__results'; // change "list" or "results"
    events.app.once('connected', this.connected, this);
  }

  connected($el) {
    events.dom.addEventListener('mousedown', this.selector + ' a', ev => {
      this.emit('mousedown', ev);
    });
    events.dom.addEventListener('click', this.selector + ' a', ev => {
      this.emit('click', ev);
    });
  }

  setResults(results) {
    this.results = results;
  }

  render() {
    this.$el.innerHTML = require('views/partials/site_search_list.jade')({
      results: this.results
    });
    return this.$el.content;
  }
}


