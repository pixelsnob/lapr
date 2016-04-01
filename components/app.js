
import React from 'react';
import ProductCategoriesNav from './navs/product_categories';
import Head from './head';
import SiteHeader from './site_header';
import ContentPanel from './content_panel';

require('../public/less/main.less');

var data = require('../var/data.json');

data.products = data.products.map(product => {
  if (Array.isArray(product.makers)) {
    product.makers = product.makers.map(product_maker_id => 
      data.makers.find(maker => maker._id == product_maker_id)
    );
  }
  if (Array.isArray(product.categories)) {
    product.categories = product.categories.map(product_category_id =>
      data.product_categories.find(product_category =>
        product_category._id == product_category_id
      )
    );
  }
  product.url = '/instruments/' + product.slug + '/' + product._id
  return product;
});


export default class extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      content_panel: false
    };
  }
  
  componentWillMount() {
    this.setState({ previous: this.props.children });
  }

  componentWillReceiveProps(props) {
    this.setState({
      content_panel: (props.location.state && props.location.state.content_panel)
    });
  }

  render() {
    var children      = this.props.children,
        content_panel = '';
    if (this.state.content_panel) {
      children      = this.state.previous;
      content_panel = <ContentPanel content={this.props.children}/>;
    }
    return (
      <html>
        <Head/>
        <body>
          <SiteHeader/>
          {content_panel}
          <div id="main">{React.cloneElement(children, data)}</div>
          <script type="text/javascript" src="/dist/vendor.js"></script>
          <script type="text/javascript" src="/dist/client.js"></script>
        </body>
      </html>
    );
  }
}

