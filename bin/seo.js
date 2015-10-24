
var jsdom    = require('jsdom'),
    request  = require('request'),
    async    = require('async'),
    db       = require('../models'),
    _        = require('underscore');

var product_names = [];

db.connection.model('Product').find({}).sort({ name: 1 }).exec(function(err, products) {
  if (err) {
    console.error(err);
    return process.exit(1);
  }
  // If product name is a list, only get the first item in the list
  var product_names = products.map(function(product) {
    var name_parts = product.name.split(',');
    return name_parts[0].trim();
  });
  // First item has quite a few duplicates...
  product_names = _.uniq(product_names);
  async.eachSeries(product_names, function(product_name, cb) {
    var q = product_name.toLowerCase() + ' rental los angeles';
    //var q = 'rent ' + product_name.toLowerCase() + ' los angeles';
    async.waterfall([
      // Query google for this instrument
      function(next) {
        var url = 'https://www.google.com/search?q=' + encodeURIComponent(q);
        scrapeUrl(url, next);
      },
      // DOMify it
      function(res, body, next) {
        if (err) {
          return cb(err);
        }
        jsdomify(body, next);
      },
      // Determine rankings based on where site links appear in list
      function(window, next) {
        if (err) {
          return cb(err);
        }
        if (!window) {
          return cb('window object is missing');
        }
        var indices = [], $ = window.$;
        $('.r').forEach(function(el, i) {
          if ($(el).find('[href*="lapercussionrentals.com"]').length) {
            indices.push(i + 1);
          }
        });
        var rankings = (indices.length ? indices.join(', ') : 'NOT ON PAGE 1');
        // Output query and ranking
        console.log("%s\t%s", q, rankings);
        next();
      }
    ], cb);
  }, function(err) {
    console.log('Done!');
    console.log(new Date);
    process.exit(0);
  });
});

function scrapeUrl(url, next) {
  request(url, function(err, res, body) {
    if (err) {
      return next(err);
    }
    next(null, res, body);
  });
}

function jsdomify(html, next) {
  jsdom.env({
    scripts: [ '//cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js' ],
    html: html,
    done: function(err, window) {
      if (err) {
        return cb(err);
      }
      next(null, window);
    }
  });
}


