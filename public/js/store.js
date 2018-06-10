
// Backbone collections/models adapter

import ProductsCollection from 'collections/products';
import ContactModel from 'models/contact';

const products = new ProductsCollection;

const store = {};
export default store; 

// Main products collection
Object.defineProperty(store, 'products', {
  value: products
});
  
// Product related collections "refs"
Object.keys(products.refs).forEach(ref_name => {
  Object.defineProperty(store, ref_name, {
    value: products.refs[ref_name]
  });
});

Object.defineProperty(store, 'Contact', {
  value: ContactModel
});

var populated_products = [];
Object.defineProperty(store, 'populated_products', {
  get: () => {
	if (populated_products.length) {
	  return populated_products;
	} else {
	  populated_products = products.toJSON(['images','makers']);
	  return populated_products;
	}
  }
});