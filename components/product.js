
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
    if (Array.isArray(this.state.product.makers)) {
      return this.state.product.makers.map(maker => maker.name).join(', ');
    }
  }

  render() {
    var thumbnail = '';
    if (this.props.product.thumbnail) {
      thumbnail = (
        <img src={"/dist/images/products/" + this.props.product.thumbnail}
         alt={this.props.product.name}/>
      );
    }
    return (
      <li>
        <div itemScope itemType="http://schema.org/Product" className="product">
          <div className="image">{thumbnail}</div>
          <div className="details hidden-xs hidden-sm">
            <h3 className="name">
              <a href={this.props.product.url} itemProp="name">{this.props.product.name}</a>
            </h3>
            <link itemProp="url" href={this.props.product.url}/>
            <p itemProp="manufacturer" className="makers secondary">{this.getMakers()}</p>
          </div>
        </div>
      </li>
    ); 
  }
}

