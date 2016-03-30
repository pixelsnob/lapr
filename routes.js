
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from './components/app';
import Index from './components/pages/index';
import Instruments from './components/pages/instruments';
import SoundSearch from './components/pages/sound-search';


module.exports = [ 
  <Route component={App}>
    <Route path="/" component={Index}/>
    <Route path="/instruments(/categories/:category)" component={Instruments}/>
    <Route path="/instruments/tags(/:tags)" component={SoundSearch}/>
  </Route>
];


