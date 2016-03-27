
import React from 'react';
import ProductCategoriesNav from './navs/product_categories';
import Head from './head';
import SiteHeader from './site_header';

var data = require('../var/data.json');


require('../public/less/main.less');

export default class extends React.Component {
  
  constructor(props) {
    super(props);
    //this.props = Object.assign(this.props, data);
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

