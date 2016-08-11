
import React from 'react';
import ProductCategoryComponent from './product_category';

export default class extends React.Component{
  
  render() {
    //console.log(this.props.product_categories);
    return (
      <ul className={this.props.className}>
        {this.props.product_categories.map((product_category) => 
          <ProductCategoryComponent
            key={product_category._id}
            product_category={product_category}
            {...this.props}
          />
        )}
      </ul>
    );
  }
}


