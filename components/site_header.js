
import React from 'react';

export default class extends React.Component {
  
  /*constructor(props) {
    super(props);
    this.props = Object.assign(this.props, data);
  }*/
  
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
                <a href="/" title="L.A. Percussion Rentals" className="navigate">
                  <span>L.A. Percussion Rentals</span>
                </a>
              </h1>
            </div>
            <div className="col-xs-5 visible-md-block visible-lg-block">
              <nav>
                <ul className="nav navbar-nav">
                  <li className="dropdown instruments">
                    <a href="/instruments" className="dropdown-toggle navigate">Instruments</a>
                    <ul className="dropdown-menu">
            
                    </ul>
                  </li>
                  <li><a href="/instruments/tags" className="navigate">Sound Search</a></li>
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
