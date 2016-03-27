
import React from 'react';

export default class ProductComponent extends React.Component {
  
  handleOnclick = (ev) => {
    console.log(ev);
  }

  render() {
    return (
      <li>
        <div itemScope itemtype="http://schema.org/Product" className="product">
          <div className="image">
            <img src={"//www.lapercussionrentals.com/images/products/" + this.props.product.thumbnail} alt={this.props.product.name} style={{ display: 'none' }}/>
          </div>
          <div className="details hidden-xs hidden-sm">
            <h3 className="name">
              <a href="/instruments/accordion/490" itemProp="name">{this.props.product.name}</a>
            </h3>
            <link itemProp="url" href="http://www.lapercussionrentals.com/instruments/accordion/490"/>
            <p itemProp="manufacturer" className="makers secondary">Hohner</p>
          </div>
        </div>
      </li>
    ); 
  }
}

