
'use strict';

var
  port              = 3003,
  express           = require('express'),
  app               = express(),
  jade_browser      = require('jade-browser'),
  passport          = require('passport'),
  _                 = require('underscore'),
  session           = require('express-session'),
  redis_store       = require('connect-redis')(session),
  body_parser       = require('body-parser'),
  fs                = require('fs'),
  env               = process.env.NODE_ENV || 'development';

require('./lib/marked')(app);
require('./lib/auth');
require('./lib/view_helpers')(app);

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
app.use(require('express-paginate').middleware(30, 60));
app.locals.pretty = true;
app.locals._ = _;

app.use(function(req, res, next) {
  //res.locals.nav = require('./nav');
  res.locals.csrf = req.csrfToken();
  // Data to dump on the page in a script tag
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
  [ 'admin/*.jade', 'product_*.jade', 'products_*.jade', 'partials/*.jade' ],
  { root: app.get('views'), minify: (env == 'production') }
));


var routes = require('./routes')(app);

app.use(routes.getProducts);

app.route('/login').get(routes.loginForm).post(routes.login);
app.route('/logout').get(routes.logout);

app.route('/').get(routes.showIndex);

// Products

app.route('/instruments')
  .get(routes.showProducts)
  .post(routes.showProducts)

app.route('/instruments/categories/all')
  .get(routes.showProducts)
  .post(routes.showProducts);

app.route('/instruments/categories/:category')
  .get(routes.showProductsByCategory)
  .post(routes.showProductsByCategory);

app.route('/instruments/tags/:tags?')
  .get(routes.showProductsByTags);

app.route('/files/tmp')
  .post(routes.auth, routes.saveTempUpload);

app.route('/instruments/:slug/:id?')
  .get(routes.showProduct)
  .post(routes.auth, routes.add('Product'))
  .put(routes.auth, routes.saveProductFiles, routes.update('Product'))
  .delete(routes.auth, routes.remove('Product'));


// Product refs

app.route('/categories')
  .get(routes.get('ProductCategory'))
  .post(routes.auth, routes.add('ProductCategory'));

app.route('/categories/:id')
  .put(routes.auth, routes.update('ProductCategory'))
  .delete(routes.auth, routes.remove('ProductCategory'));

app.route('/makers')
  .get(routes.get('Maker'))
  .post(routes.auth, routes.add('Maker'));
  
app.route('/makers/:id')
  .put(routes.auth, routes.update('Maker'))
  .delete(routes.auth, routes.remove('Maker'));

app.route('/tags')
  .get(routes.get('Tag'))
  .post(routes.auth, routes.add('Tag'));

app.route('/tags/:id')
  .put(routes.auth, routes.update('Tag'))
  .delete(routes.auth, routes.remove('Tag'));

app.route('/tag-categories')
  .get(routes.get('TagCategory'))
  .post(routes.auth, routes.add('TagCategory'));

app.route('/tag-categories/:id')
  .put(routes.auth, routes.update('TagCategory'))
  .delete(routes.auth, routes.remove('TagCategory'));

/*app.route('/images')
  .get(routes.get('Image'))
  .post(routes.auth, routes.add('Image'));

app.route('/images/:id')
  .put(routes.auth, routes.update('Image'))
  .delete(routes.auth, routes.remove('Image'));*/

//app.use(require('cms/router'));

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

