
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
  marked            = require('./lib/marked')(app),
  env               = process.env.NODE_ENV || 'development',
  jsdom             = require('jsdom');

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
  secret: 'blah*99p3c20', // <<<<<<<<<
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
  res.locals.markdown = app.locals.markdown;
  next();
});

app.use(require('./lib/pages'));
app.use(require('./lib/post_render'));

app.use(jade_browser(
  '/jade.js',
  [ 'admin/**/*.jade', 'product_*.jade', 'products_*.jade', 'partials/**/*.jade' ],
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

app.route('/instruments/text-search/:search')
  .get(routes.showProductsTextSearchResults);

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
  .post(routes.auth, routes.moveProductImages, routes.add('Product'))
  .put(routes.auth, routes.moveProductImages, routes.update('Product'))
  .delete(routes.auth, routes.remove('Product'));

// Product refs and related CRUD

var models = {
  ProductCategory:  '/api/categories',
  Maker:            '/api/makers',
  Tag:              '/api/tags',
  TagCategory:      '/api/tag-categories',
  YoutubeVideo:     '/api/youtube-videos',
  User:             '/api/users',
  Page:             '/api/pages',
  ContentBlock:     '/api/content-blocks',
  ProductType:      '/api/product-types'
};

for (var model in models) {
  app.route(models[model])
    .get(routes.get(model))
    .post(routes.auth, routes.add(model))
  
  app.route(models[model] + '/:id')
    .put(routes.auth, routes.update(model))
    .delete(routes.auth, routes.remove(model));
}

app.route('/api/contacts')
  .get(routes.get('Contact'))
  .post(routes.addContact);

app.route('/api/content-blocks/name/:name')
  .get(routes.getContentBlockByName);

app.route('/api/content-blocks/:id')
  .get(routes.getContentBlockById);

app.route('/api/images')
  .get(routes.get('Image'))
  .post(routes.auth, routes.moveImage, routes.add('Image'));

app.route('/api/images/:id')
  .put(routes.auth, routes.moveImage, routes.update('Image'))
  .delete(routes.auth, routes.remove('Image'));

app.route('/contact')
  .get(routes.getContentBlocks, routes.showContactForm);

// 404

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

