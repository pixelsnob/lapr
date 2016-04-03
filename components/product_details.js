
import React from 'react';
import ContentPanel from './content_panel';

export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(props) {
  }

  getProduct() {
    return this.props.products.find(product =>
      product._id == this.props.params.product_id
    );
  }
  
  render() {
    var product = this.getProduct();
    if (!product) {
      return (<div>Instrument not found</div>);
    }
    return (
      <div itemScope itemType="http://schema.org/Product" className="container-fluid product-details">
        <div className="row">
          <div className="col-md-12">
            <h2 itemProp="name">{product.name}</h2>
            <link itemProp="url" href={product.url}/>
            <div className="image pull-right">
              <img src={"/dist/images/products/" + product.image} width="400"
               title={product.name} alt={product.name} itemProp="image"/>
            </div>
            <p itemProp="manufacturer" className="makers">
              {(product.makers.length ? 'Mfg. by ' +
                product.makers.map(maker => maker.name).join(', ') : '')}
            </p>
            <div itemProp="description" className="description">
              {product.description}
            </div>
            
            <div className="more-info-container">
              <a href="javascript:void(0);" className="show-more-info">More Information...</a>
              <div className="more-info hide">
                
              </div>
            </div>

            <dl>
              <dt>Price/Day</dt>
              <dd itemProp="price">{product.price}</dd>
            </dl>
            <div className="range"></div>
            <div className="sounds">
            </div>
            <div className="nav-links">
              <nav>
                <ul>
                  <li className="previous">
                    <a href="javascript:void(0)" title="Previous Instrument">Previous</a>
                  </li>
                  <li className="next">
                    <a href="javascript:void(0)" title="Next Instrument">Next</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div> 
      </div>
    );

  }
}


