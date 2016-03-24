
import React from 'react';
import ProductComponent from './product';

export default class extends React.Component {
  
  render() {
    return (
      <div id="products">
        <div>{this.props.products.length}</div>
        <ul>
          {this.props.products.map((product) => 
            <ProductComponent product={product} key={product._id}/>
          )}
        </ul>
      </div>
    );
  }
}

