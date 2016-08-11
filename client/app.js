
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from 'routes';

fetch('http://pixelsnob.com:3003/app-data')
  .then(res => res.json())
  .then(data => {
    let createElement = (Component, props) =>
      <Component {...props} { ...data } />;

    ReactDOM.render(
      <Router
        routes={routes}
        history={browserHistory}
        createElement={createElement}
      />,
      document
    );
  });


//if (module.hot) {
//  module.hot.accept();
//}

