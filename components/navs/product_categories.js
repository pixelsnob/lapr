
import React from 'react';
import ProductCategoryComponent from './product_category';

export default class extends React.Component{
  
  render() {
    return (
      <ul>
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


