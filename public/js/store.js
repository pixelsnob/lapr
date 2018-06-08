
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
