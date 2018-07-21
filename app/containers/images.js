
import template from 'lib/template';
import events from 'events/app';
import ImageContainer from 'containers/image';

export default class {
  
  constructor(params, store, $el) {
    this.params = params;
    this.store = store;
    this.$el = $el || document.createElement('template');
  }
  
  render() {
    this.$el.innerHTML = require('views/partials/images.jade')();
    const $ul = this.$el.content.querySelector('ul.images-list');
    if (this.params.images) {
      this.params.images.forEach(image => {
        const image_component = new ImageContainer({
          ...this.params,
          image,
          //image_path: '/images/products/'
        }, this.store);
        $ul.appendChild(image_component.render());
      });
    }
    return this.$el.content;
  }
}


