
import InstrumentDetailsContainer from 'containers/instrument_details';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
  }

  render() {
    if (!this.context.params.product_id) {
      return { error: 'context.params.product_id not found' };
    }
    const product = this.store.products.models.find(product =>
      product.id == this.context.params.product_id
    );
    if (!product) {
      return { error: `Product with id ${this.context.params.product_id} not found` };
    }
    const instrument_details_container = new InstrumentDetailsContainer({
      ...this.context,
      params: {
        ...this.context.params,
        product: product.toJSON([ 'images', 'makers', 'youtube_videos' ])
      }
    }, this.store);
    return instrument_details_container.render();
  }
}


