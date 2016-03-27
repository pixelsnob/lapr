
import React from 'react';
import { Link } from 'react-router';
import Products from './products';

export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="container-fluid products products-categories-search">
        <div className="row">
          <div className="sidebar col-xs-6 col-sm-6 col-md-3">
            <nav>
            </nav>
          </div>
          <div className="products-results col-xs-6 col-sm-6 col-md-9">
            <div id="heading-container">
              <h2 className="line-after">All Instruments</h2>
              <div className="more-info-container hide">
                <a href="javascript:void(0);" className="more-info">More&hellip;</a>
              </div>
              <div className="stats-container">
                <div className="stats secondary">30 Results</div>
                <div className="sort-direction hidden-xs hidden-sm">
                  <a href="javascript:void(0);" className="toggle-sort-direction">Sort Descending</a>
                </div>
              </div>
            </div>
            <div className="boxes-list">
              <Products products={this.props.products}/>
              <div className="more-container">
                <a href="/instruments?page=2&amp;limit=30" className="more">More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

