
import React from 'react';
import ContentPanel from './content_panel';

export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div itemScope itemType="http://schema.org/Product" className="container-fluid product-details">
        <div className="row">
          <div className="col-md-12">
            <h2 itemProp="name">MK VII 88A with Speaker Platform</h2>
            <link itemProp="url" href=""/>
            <div className="image pull-right">
              <img src="/images/products/rhodes_mark_7_88.jpg" width="400" title="MK VII 88A with Speaker Platform" alt="MK VII 88A with Speaker Platform" itemProp="image"/>
            </div>
            <p itemProp="manufacturer" className="makers">Mfg. by Rhodes</p>
            <div itemProp="description" className="description">
              <p>The Mark 7 is modeled after the vintage Mark V and is a genuine electro-mechanical piano, built from scratch by Rhodes.</p>
            </div>
            <div className="more-info-container"><a href="javascript:void(0);" className="show-more-info">More Information...</a>
              <div className="more-info hide">
              </div>
            </div>
            <dl>
              <dt>Price/Day</dt>
              <dd itemProp="price">$220</dd>
            </dl>
            <div className="range"></div>
            <div className="sounds">
            </div>
            <div className="nav-links">
              <nav>
                <ul>
                  <li className="previous"> <a href="javascript:void(0)" title="Previous Instrument">Previous</a></li>
                  <li className="next"><a href="javascript:void(0)" title="Next Instrument">Next</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div> 
      </div>
    );

  }
}

