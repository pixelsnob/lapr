
import InstrumentDetailsContainer from 'containers/instrument_details';
import template from 'lib/template';
import events from 'events/app';

export default class {
  
  constructor(context, store, $el) {
    this.context = context;
    this.store = store;
    this.$el = $el || document.createElement('template');
    
    console.log(this.list);

    events.once('connected', this.connected.bind(this));
  }
  
  connected($el) {
    window.scrollTo(0, 0);
  }

  render() {
    
    var list;

    if (this.context.params.id && this.context.params.list.length == 0) {
      const product = this.store.products.models.find(product =>
        product.id == this.context.params.id
      );
      if (!product) {
        // error
        return this.$el.content;
      }
      list = [ product ];
    } else {
      list = this.context.params.list
    }

    const $ul = document.createElement('ul');

    $ul.className = 'product-details-list';
    this.$el.content.appendChild($ul);

    list.forEach(product => {
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


