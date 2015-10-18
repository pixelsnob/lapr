
var jsdom    = require('jsdom'),
    request  = require('request'),
    async    = require('async'),
    db       = require('../models');

db.connection.model('Product').find({}).sort({ name: 1 }).exec(function(err, products) {
  if (err) {
    console.error(err);
    return process.exit(1);
  }
  async.eachSeries(products, function(product, cb) {

    var name = product.name.split(', ');
    console.log(name);
    var q = product.name.toLowerCase() + ' rental los angeles';

    async.waterfall([
      
      // Google search for this instrument
      function(next) {
        request('https://www.google.com/search?q=' + encodeURIComponent(q), function(err, res, body) {
          if (err) {
            return cb(err);
          }
          next(null, res, body);
        });
      },
      
      // DOMify it
      function(res, body, next) {
        if (err) {
          return cb(err);
        }
        jsdom.env({
          scripts: [ '//cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js' ],
          html: body,
          done: function(err, window) {
            if (err) {
              return cb(err);
            }
            next(null, window);
          }
        });
      },
      
      // Search it
      function(window, next) {
        if (err) {
          return cb(err);
        }
        if (!window) {
          return cb('window object is missing');
        }
        var $ = window.$;
        var indices = [];
        $('.r').forEach(function(el, i) {
          if ($(el).find('[href*="lapercussionrentals.com"]').length) {
            indices.push(i + 1);
          }
        });
        var rankings = (indices.length ? indices.join(', ') : 'NOT ON PAGE 1');
        console.log("%s\t%s", q, rankings);
        next();
      }
    ], cb);
  }, function(err) {
    if (err) {
      console.error('error');
      return process.exit(1);
    }
    console.log('Done!');
    process.exit(0);
  });
  
});


