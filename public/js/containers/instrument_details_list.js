
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
    events.removeAllListeners('app:scroll');
    events.on('app:scroll', _.throttle(this.onScroll.bind(this), 100, true));
    events.once('products-text-search:selected', i => {
      setTimeout(() => {
        const $li = $el.querySelector(`.product-details-list > li:nth-of-type(${i})`);
        if ($li) {
          document.documentElement.scrollTop = document.body.scrollTop = ($li.offsetTop - 70);
        }
      }, 10);
    });
  }
  
  onScroll(ev) {
    ev.stopPropagation();
    const $product_details_list = document.querySelectorAll('.product-details-list > li');
    var done = false; 
    Array.from($product_details_list).forEach($li => {
      if (done) {
        return null;
      }
      if ($li.offsetTop > (document.documentElement.scrollTop || document.body.scrollTop)) {
        $li.className = 'active';
        //$li.style = '';
        done = true;
        // prevent from running if we "self induce" a scroll by setting scrollTop above
        //console.log('------------');
        if ($li.dataset.pathname != location.pathname) {
          //console.log('xxxxxxx');
          events.emit('app:product-selected', $li.dataset.pathname);
          //events.emit('app:navigate', $li.dataset.pathname);
        }
      }
    });
  }

  render() {
    // check to see if product is in filtered products? ////
    //const exists = products_list.find(product => product._id == this.context.params.id);

    const products_list = this.store.filtered_products.models;

    if (products_list.length && !window.__lapr_ssr) {

      const $ul = document.createElement('ul');
      $ul.className = 'product-details-list';
      this.$el.content.appendChild($ul);

      products_list.forEach(product => {
        const instrument_details_container = new InstrumentDetailsContainer({
          ...this.context, params: { ...this.context.params, id: product.id } 
        }, this.store);
        const $li = document.createElement('li');
        if (product.id == this.context.params.id) {
          $li.className = 'active';
        } else {
          $li.className = 'inactive';
        }
        $ul.appendChild($li);
        $li.appendChild(instrument_details_container.render());
        $li.setAttribute('data-pathname', `/instruments/${product.get('slug')}/${product.id}`);
      });
    } else {
      const instrument_details_container = new InstrumentDetailsContainer(
        this.context,
        this.store
      );
      this.$el.content.appendChild(instrument_details_container.render());
    }
    return this.$el.content;
  }
}


