
import template from 'lib/template';
import events from 'events/app';

export default class {
  
  constructor(params, store, $el) {
    this.params = params;
    this.store = store;
    this.$el = $el || document.createElement('template');
  }
  
  render() {
    var base_path = '/dist/images/products/';

    switch (this.params.display) {
      case 'crop':
        base_path += 'crop/';
        break;

      case 'crop-blur':
        base_path += 'crop-blur/';
        break;
      case '400w':
        base_path += '400/';
        break;
    }

    this.$el.innerHTML = require('views/partials/image.jade')({
      image: this.params.image,
      base_path
    });
    return this.$el.content;
  }
}
