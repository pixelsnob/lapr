
import React from 'react';
import ProductCategoriesNav from './navs/product_categories';
import Head from './head';
import SiteHeader from './site_header';

require('../public/less/main.less');

var data = require('../var/data.json');

data.products = data.products.map(product => {
  if (product.makers.length) {
    product.makers = product.makers.map(product_maker_id => 
      data.makers.find(maker => maker._id == product_maker_id)
    );
  }
  return product;
}).map(product => {
  if (product.categories.length) {
    product.categories = product.categories.map(product_category_id =>
      data.product_categories.find(product_category =>
        product_category._id == product_category_id
      )
    );
  }
  return product;
});


export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <html>
        <Head/>
        <body>
          <SiteHeader/>
          <div id="main">{React.cloneElement(this.props.children, data)}</div>
          <script type="text/javascript" src="/dist/vendor.js"></script>
          <script type="text/javascript" src="/dist/client.js"></script>
        </body>
      </html>
    );
  }
}

