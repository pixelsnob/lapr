
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import AppComponent from './components/app';
import IndexComponent from './components/index';

module.exports = [ 
  <Route component={AppComponent}>
    <Route path="/" component={IndexComponent}/>
  </Route>
];

