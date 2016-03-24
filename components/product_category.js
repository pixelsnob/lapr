
import React from 'react';
import { Link } from 'react-router';

export default class extends React.Component{
  
  render() {
    var style = {};
    if (this.props.product_category_id == this.props.product_category._id) {
      style = { color: 'red' };
    }
    return (
      <li> 
        <Link
          to={`/sound-search/category/${this.props.product_category.slug}`}
          style={style}>
            {this.props.product_category.name}
        </Link>
      </li>
    );
  }
}


