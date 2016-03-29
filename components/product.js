
import React from 'react';

export default class ProductComponent extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      product: props.product
    };
  }

  handleOnclick = ev => {
    console.log(ev);
  }
  
  getMakers = () => {
    if (this.state.product.makers.length) {
      return this.state.product.makers.map(maker => maker.name).join(', ');
    }
  }

  render() {
    return (
      <li>
        <div itemScope itemtype="http://schema.org/Product" className="product">
          <div className="image">
          </div>
          <div className="details hidden-xs hidden-sm">
            <h3 className="name">
              <a href={this.props.product.url} itemProp="name">{this.props.product.name}</a>
            </h3>
            <link itemProp="url" href="http://www.lapercussionrentals.com/instruments/accordion/490"/>
            <p itemProp="manufacturer" className="makers secondary">{this.getMakers()}</p>
          </div>
        </div>
      </li>
    ); 
  }
}

// <img src={"//www.lapercussionrentals.com/images/products/" + this.props.product.thumbnail} alt={this.props.product.name} style={{ display: 'none' }}/>
