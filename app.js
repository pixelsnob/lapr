
'use strict';

var
  port            = 3003,
  express         = require('express'),
  app             = express(),
  jade_browser    = require('jade-browser'),
  passport        = require('passport'),
  _               = require('underscore'),
  session         = require('express-session'),
  redis_store     = require('connect-redis')(session),
  body_parser     = require('body-parser'),
  fs              = require('fs'),
  env             = process.env.NODE_ENV || 'development';

require('./lib/marked')(app);
require('cms/lib/auth');
require('cms/lib/view_helpers')(app);

if (env == 'development') {
  app.use(express.static('public'));
}

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.set('view cache', (env == 'production'));
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json({ extended: true }));
app.use(require('cookie-parser')());
app.use(session({
  store: new redis_store,
  secret: 'blah*99p3c20',
  proxy: true,
  cookie: { secure: (env == 'production') },
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('csurf')());
app.locals.pretty = true;
app.locals._ = _;

app.use(function(req, res, next) {
  res.locals.nav = require('./nav');
  res.locals.csrf = req.csrfToken();
  // Data to dump on the page in a script tag
  res.locals.json_data = require('./lib/json_data');
  if (req.isAuthenticated()) {
    res.locals.user = _.omit(req.user, [ 'password', '__v' ]);
    // Disable caching if logged in
    res.setHeader('Cache-Control', 'no-cache');
  } else {
    delete res.locals.user;
  }
  next();
});

app.use(jade_browser(
  '/jade.js',
  [ 'cms/*.jade', 'admin/*.jade', 'product_row.jade' ],
  { root: app.get('views'), minify: (env == 'production') }
));

var routes     = require('./routes')(app),
    cms_routes = require('cms/routes');

app.route('/products')
  .get(routes.getProducts)
  .post(routes.getProducts)

// temp
app.route('/api/products')
  .get(routes.getProductsApi);

app.route('/products/categories/:category')
  .get(routes.getProducts)
  .post(routes.getProducts);

app.route('/products/:slug/:id?')
  .get(routes.getProduct)
  .post(cms_routes.auth, routes.add('Product'))
  .put(cms_routes.auth, routes.update('Product'))
  .delete(cms_routes.auth, routes.remove('Product'));

app.route('/categories')
  .get(routes.get('ProductCategory'))
  .post(cms_routes.auth, routes.add('ProductCategory'));

app.route('/categories/:id')
  .put(cms_routes.auth, routes.update('ProductCategory'))
  .delete(cms_routes.auth, routes.remove('ProductCategory'));

app.route('/makers')
  .get(routes.get('Maker'))
  .post(cms_routes.auth, routes.add('Maker'));
  
app.route('/makers/:id')
  .put(cms_routes.auth, routes.update('Maker'))
  .delete(cms_routes.auth, routes.remove('Maker'));

app.route('/tags')
  .get(routes.get('Tag'))
  .post(cms_routes.auth, routes.add('Tag'));

app.route('/tags/:id')
  .put(cms_routes.auth, routes.update('Tag'))
  .delete(cms_routes.auth, routes.remove('Tag'));

app.use(require('cms/router'));

app.use(function(req, res, next) {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

// Error page
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.format({
    html: function() {
      res.render('error', { error: err.message });
    },
    json: function() {
      res.status(500);
      res.json({ ok: 0 });
    }
  });
});

app.listen(port);
console.log('Listening on port ' + port);

