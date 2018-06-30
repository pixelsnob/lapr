
import template from 'lib/template';
import events from 'events/app';

export default class {
  
  constructor(context, store, $el) {
    this.context = context;
    this.store = store;
    this.$el = $el || document.createElement('template');
  }
  
  render() {
    var base_path = '/dist/images/products/';

    switch (this.context.params.display) {
      case 'crop':
        base_path += 'crop/';
        break;
        
      case '400w':
        base_path += '400/';
        break;
    }

    this.$el.innerHTML = require('views/partials/image.jade')({
      image: this.context.params.image,
      base_path
    });
    return this.$el.content;
  }
}
