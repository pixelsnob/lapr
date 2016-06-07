
'use strict';

var
  config            = require('./config'),
  port              = config.port || 3003,
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
  git               = require('simple-git')(__dirname);

require('./lib/auth');
require('./lib/view_helpers')(app);

if (env == 'development') {
  app.use(express.static('public'));
}

app.locals.config = config;

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.set('view cache', (env == 'production'));
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json({ extended: true }));
app.use(require('cookie-parser')());
app.use(session({
  store: new redis_store,
  secret: config.session_secret,
  proxy: true,
  cookie: { secure: true, httpOnly: true },
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
//app.use(require('csurf')());
app.use(require('express-paginate').middleware(30, 60));
app.locals.pretty = true;
app.locals._ = _;

// Get current git commit id to append to asset urls
git.revparse([ 'HEAD' ], (err, rev) => {
  if (err) {
    console.error('Attempt to get git version hash failed: using timestamp');
    app.locals.assets_version = (new Date).getTime();
  } else {
    app.locals.assets_version = rev.trim();
  }
});

app.use((req, res, next) => {
  res.locals.base_url = req.headers['x-forwarded-proto'] +
                        '://' + req.headers.host;
  res.locals.original_url = req.originalUrl;
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
  '**/*.jade',
  { root: app.get('views'), minify: (env == 'production') }
));

var routes = require('./routes')(app);

app.use(routes.getProducts);

if (config.enable_admin) {
  app.route('/login').get(routes.loginForm).post(routes.login);
  app.route('/logout').get(routes.logout);
}

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

app.route('/contact')
  .get(routes.getContentBlocks, routes.showContactForm);

app.route('/sitemap.xml').get(routes.showSitemap);

// Product refs and related CRUD

app.route('/api/slideshow-images')
  .get(routes.getSlideshowImages);

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

app.route('/api/errors').post(routes.add('Error'));

// 404

app.use((req, res, next) => {
  res.status(404).render('not_found');
});

// Error page

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.format({
    html: () => {
      res.render('error', { error: err.message });
    },
    json: () => {
      res.status(500);
      res.json({ ok: 0 });
    }
  });
});

app.listen(port);
console.log('Listening on port ' + port);

// Force garbage collection
//if (typeof gc == 'function') {
//  setInterval(gc, 60000);
//}




