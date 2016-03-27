
import React from 'react';
import Product from './product';

export default class extends React.Component {
  
  render() {
    return (
      <ul className="results">
        {this.props.products.map(product => 
          <Product product={product} key={product._id}/>
        )}
      </ul>
    );
  }
}

