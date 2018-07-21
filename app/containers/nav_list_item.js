
import template from 'lib/template';
import events from 'events/app';

export default class {
  
  constructor(params, store) {
    this.params = params;
    this.store = store;

    this.$el = document.createElement('template');
  }

  render() {
    const base_path = this.params.base_path || '/instruments/';
    this.$el.innerHTML = require('views/partials/nav_list_item.jade')({
      name: this.params.item.name,
      path: base_path + this.params.item.slug + '/' + this.params.item._id,
      selected: this.params.selected
    });
    return this.$el.content;
  }
}

