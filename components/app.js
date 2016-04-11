
import React from 'react';
import ProductCategoriesNav from './navs/product_categories';
import Head from './head';
import SiteHeader from './site_header';
import ContentPanel from './content_panel';

require('../public/less/main.less');

const data = require('../var/data.json');
if (typeof window != 'undefined') {
  require('admin');
}
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
      content_panel:     false,
      previous_children: null
    };
  }
  
  componentWillMount() {

  }

  componentWillReceiveProps(props) {
    // Store #main content
    this.setState({
      content_panel: (props.location.state && props.location.state.content_panel),
      previous:      this.props.children
    });
  }

  render() {
    var children      = this.props.children,
        content_panel = '';
    // Show previous #main content underneath content_panel
    if (this.state.content_panel) {
      children      = this.state.previous;
      content_panel = <ContentPanel content={this.props.children} {...data}/>;
    }
    var main = React.cloneElement(children, Object.assign(data,
      { content_panel: this.state.content_panel }));
    return (
      <html>
        <Head/>
        <body>
          {content_panel}
          <SiteHeader {...data}/>
          <div id="main">
            {main}
          </div>
          <script type="text/javascript">{ 'window.lapr = { markdown_opts: {} };' }</script>
          <script type="text/javascript" src="/dist/client.js"></script>
        </body>
      </html>
    );
  }
}


