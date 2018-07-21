
import InstrumentDetailsContainer from 'containers/instrument_details';

export default class {
  
  constructor(params, store) {
    this.params = params;
    this.store = store;
  }

  render() {
    if (!this.params.product_id) {
      return { error: 'params.product_id not found' };
    }
    const product = this.store.products.models.find(product =>
      product.id == this.params.product_id
    );
    if (!product) {
      return { error: `Product with id ${this.params.product_id} not found` };
    }
    const instrument_details_container = new InstrumentDetailsContainer({
      ...this.params,
      product: product.toJSON([ 'images', 'makers', 'youtube_videos' ])
    }, this.store);
    return instrument_details_container.render();
  }
}


