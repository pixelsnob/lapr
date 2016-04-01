
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from './components/app';
import ContentPanel from './components/content_panel';
import Index from './components/pages/index';
import Instruments from './components/pages/instruments';
import SoundSearch from './components/pages/sound-search';
import ProductDetails from './components/product_details';


module.exports = [ 
  <Route component={App}>
    <Route path="/" component={Index}/>
    <Route path="/instruments(/categories/:category)" component={Instruments}/>
    <Route path="/instruments/tags(/:tags)" component={SoundSearch}/>
    <Route path="/instruments/:slug/:product_id" component={ProductDetails}/>
  </Route>
];


