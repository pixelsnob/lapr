
var jsdom  = require('jsdom');

/**
 * Gets table data as an array of rows/cols
 * 
 */
module.exports.getRowsFromTable = function(url, cb) {
  jsdom.env({
    url: url,
    scripts: [ '//cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js' ],
    done: function (err, window) {
      if (err || !window) {
        cb(new Error('jsdom error loading page ' + url));
        return;
      }
      var $ = window.$;
      var rows = [], c = 0;
      $('table table').find('tr').each(function(j, tr) {
        var cols = [];
        // Keep a running length of the text, so if it's all whitespace
        // the row won't get added
        var running_len = 0;
        $(tr).find('td').each(function(k, td) {
          // Remove newlines and extra spaces
          var text = $.trim($(td).text().replace(/\n|\s{2,}/g, ' '));
          cols.push(text);
          running_len += text.length;
        });
        // Don't add blanks
        if (running_len) {
          rows.push(cols);
        }
      });
      // Return data
      cb(null, rows);
    }
  });
};

