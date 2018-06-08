
// Backbone collections/models adapter

import ProductsCollection from 'collections/products';

export default class {
  
  constructor() {

    Object.defineProperty(this, 'products', {
      value: new ProductsCollection,
      enumerable: false,
      writable: false,
      configurable: false
    });

    Object.keys(this.products.refs).forEach(ref_name => {
      Object.defineProperty(this, ref_name, {
        value: this.products.refs[ref_name],
        enumerable: false,
        writable: false,
        configurable: false
      });
    });
  }

}
