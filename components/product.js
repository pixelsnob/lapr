
import React from 'react';

export default class ProductComponent extends React.Component {
  
  handleOnclick = (ev) => {
    console.log(ev);
  }

  render() {
    return (
      <li onClick={this.handleOnclick}>
        {this.props.product.name}
      </li>
    ); 
  }
}

