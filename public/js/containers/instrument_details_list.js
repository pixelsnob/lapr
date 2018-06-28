
import InstrumentDetailsContainer from 'containers/instrument_details';
import template from 'lib/template';
import events from 'events/app';

export default class {
  
  constructor(context, store, $el) {
    this.context = context;
    this.store = store;
    this.$el = $el || document.createElement('template');

    events.once('connected', this.connected.bind(this));
  }
  
  connected($el) {
    window.scrollTo(0, 0);
  }

  render() {

    const $ul = document.createElement('ul');
    this.$el.content.appendChild($ul);

    $ul.className = 'product-details-list';

    //console.log(this.store.filtered_products.models.length);

    this.store.filtered_products.models.forEach(product => {
      const instrument_details_container = new InstrumentDetailsContainer({
        ...this.context,
        params: {
          ...this.context.params,
          product: product.toJSON([ 'images', 'makers', 'youtube_videos' ])
        } 
      }, this.store);

      const $li = document.createElement('li');

      if (product.id == this.context.params.id) {
        $li.className = 'active';
      } else if (this.context.params.id) {
        $li.className = 'inactive';
      }
      
      $ul.appendChild($li);
      $li.appendChild(instrument_details_container.render());
      $li.setAttribute('data-pathname', `/instruments/${product.get('slug')}/${product.id}`);
    });
      
    return this.$el.content;
  }
}


