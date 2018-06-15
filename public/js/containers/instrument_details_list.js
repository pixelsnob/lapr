
import InstrumentDetailsContainer from 'containers/instrument_details';
import template from 'lib/template';
import events from 'events/app';

export default class {
  
  constructor(context, store, $el) {
    this.context = context;
    this.store = store;
    this.$el = $el || document.createElement('template');
    events.once('connected', this.connected.bind(this));
    events.removeAllListeners('app:scroll');
    events.on('app:scroll', this.onScroll.bind(this));
  }
  
  connected($el) {
    const $active = $el.querySelector('.product-details-list li.active');
    if ($active) {
      document.documentElement.scrollTop = document.body.scrollTop = ($active.offsetTop - 70);
    }
  }

  onScroll(ev) {
    const $product_details_list = document.querySelectorAll('.product-details-list > li');
    $product_details_list.forEach($li => {
      $li.className = '';
      $li.style = 'opacity:0.2;';
    });
    var done = false; 
    $product_details_list.forEach($li => {
      if (done) {
        return null;
      }
      if ($li.offsetTop > (document.documentElement.scrollTop || document.body.scrollTop)) {
        $li.className = 'active';
        $li.style = '';
        done = true;
        if ($li.dataset.pathname != location.pathname) {
          history.pushState({}, null, $li.dataset.pathname);
        }
      }
    });
  }

  render() {
    const products_list = this.store.filtered_products.models;

    const $ul = document.createElement('ul');
    $ul.className = 'product-details-list';
    this.$el.content.appendChild($ul);

    // check to see if product is in filtered products?

    if (products_list.length) {
      products_list.forEach(product => {
        const instrument_details_container = new InstrumentDetailsContainer({
          ...this.context, params: { ...this.context.params, id: product.id } 
        }, this.store);
        const $li = document.createElement('li');
        if (product.id == this.context.params.id) {
          //$li.style = 'display: none';
          $li.className = 'active';
        } else {
          $li.style = 'opacity:0.01;';
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
      $ul.appendChild(
        instrument_details_container.render()
      );
    }
    return this.$el.content.cloneNode(true);
  }
}


