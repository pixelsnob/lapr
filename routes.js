
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from './components/app';
import Index from './components/index';
import Instruments from './components/instruments';
import SoundSearch from './components/sound-search';

module.exports = [ 
  <Route component={App}>
    <Route path="/" component={Index}/>
    <Route path="/instruments" component={Instruments}/>
    <Route path="/instruments/tags(/:tags)" component={SoundSearch}/>
  </Route>
];

