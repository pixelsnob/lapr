
import React from 'react';
import { Link } from 'react-router';
import ProductCategoriesNav from './navs/product_categories';

export default class extends React.Component {
  
  render() {
    return (
      <header className="site-header">
        <div className="site-header-inner container-fluid">
          <div className="row">
            <div className="col-xs-1 hidden-lg hidden-md">
              <a id="show-mobile-menu">
                <span className="glyphicon glyphicon-menu-hamburger"></span>
              </a>
            </div>
            <div className="col-xs-3 logo-container">
              <h1 className="logo">
                <Link to="/" title="L.A. Percussion Rentals" className="navigate">
                  <span>L.A. Percussion Rentals</span>
                </Link>
              </h1>
            </div>
            <div className="col-xs-5 visible-md-block visible-lg-block">
              <nav>
                <ul className="nav navbar-nav">
                  <li className="dropdown instruments">
                    <Link to="/instruments" className="dropdown-toggle navigate">Instruments</Link>
                    <ProductCategoriesNav product_categories={this.props.data.product_categories} className="dropdown-menu"/>
                  </li>
                  <li><Link to="/instruments/tags" className="navigate">Sound Search</Link></li>
                  <li><a href="/contact" className="navigate">Contact Us</a></li>
                </ul>
              </nav>
            </div>
            <div className="col-xs-4 hidden-xs hidden-sm">
              <div className="text-search"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

