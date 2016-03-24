
import React from 'react';
import ProductCategoriesNav from './navs/product_categories';
import SiteHeader from './site_header';
//import data from './data';

export default class extends React.Component {
  
  constructor(props) {
    super(props);
    //this.props = Object.assign(this.props, data);
  }
  
  render() {
    return (
      <body>
        <SiteHeader/>
        <div id="main">{React.cloneElement(this.props.children)}</div>
      </body>
    );
  }
}

