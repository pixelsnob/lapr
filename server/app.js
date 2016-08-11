
import { install } from 'source-map-support';
install();

import config from '../config';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import passport from 'passport';
import session from 'express-session';
import body_parser from 'body-parser';

import routes from 'routes';
import path from 'path';

var port = config.port || 3003,
    app  = express(),
    env  = process.env.NODE_ENV || 'development';

if (env == 'development') {
  app.use(express.static('public'));
}

app.set('view engine', 'jade');
app.set('views', path.resolve('./views'));
app.set('view cache', (env == 'production'));

var data = require('../shared/lib/data');

app.route('/app-data').get((req, res, next) => {
  res.json(data);
});

app.route('/*').get((req, res, next) => {
  match({ routes, location: req.url }, (error, redirect_loc, render_props) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirect_loc) {
      res.redirect(302, redirect_loc.pathname + redirect_loc.search)
    } else if (render_props) {
      let router_props = {
        ...render_props,
        createElement: (Component, props) => {
          return React.createElement(Component, { ...props, ...data });
        }
      };
      let factory = React.createFactory(RouterContext)(router_props);
      res.send('<!doctype html>' + renderToString(factory));
    } else {
      res.status(404).send('Not found')
    }
  })
});

app.listen(port);
console.log('Listening on port ' + port);

