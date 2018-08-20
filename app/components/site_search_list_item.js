
import events from 'events/app';
import uniqid from 'uniqid';

export default class {
  
  constructor(params) {
    this.params = params;
    this.$el = document.createElement('template');
    this.id = uniqid();
    this.link_selector = `#${this.id} [class$="__link"]`;
  }
  
  onMousedown(ev) {
    this.params.onMousedown(ev);
  }

  onClick(ev) {
    this.params.onClick(ev);
  }


  render() {
    this.$el.innerHTML = require('views/partials/site_search_list_item.jade')({
      item: this.params.item,
      id: this.id
    });
    if (this.params.onMousedown) {
      events.dom.addEventListener('mousedown', this.link_selector, this.onMousedown.bind(this));
    }
    if (this.params.onClick) {
      events.dom.addEventListener('click', this.link_selector, this.onClick.bind(this));
    }
    return this.$el.content.cloneNode(true);
  }

  close() {
    events.dom.removeEventListener('mousedown', this.link_selector, this.onMousedown.bind(this));
    events.dom.removeEventListener('click', this.link_selector, this.onClick.bind(this));
  }
}


