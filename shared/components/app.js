
import React from 'react';
import ProductCategoriesNav from './navs/product_categories';
import Head from './head';
import SiteHeader from './site_header';
import ContentPanel from './content_panel';

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
      content_panel = <ContentPanel content={this.props.children} data={this.props.data}/>;
    }
    var main = React.cloneElement(children, {
      data: this.props.data,
      content_panel: this.state.content_panel
    });
    return (
      <html>
        <Head/>
        <body>
          {content_panel}
          <SiteHeader data={this.props.data}/>
          <div id="main">
            {main}
          </div>
          <script type="text/javascript" src="/dist/client.js"></script>
        </body>
      </html>
    );
  }
}


