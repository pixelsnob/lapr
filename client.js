
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

ReactDOM.render(
  <Router routes={routes} history={browserHistory}/>,
  document
);

/*require.ensure([], () => {
  if (true) {
    require('./public/js/admin');
  }
});*/

