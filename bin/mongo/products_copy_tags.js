
load('public/bower_components/underscore/underscore-min.js');

var db1 = db.getSiblingDB('lapr'),
    db2 = db.getSiblingDB('lapr-staging');

var c = 0;

// Sync tags from beta to staging
db1.products.find().forEach(function(product) {
  var staging_product = db2.products.findOne({
    _id: product._id,
    tags: { $all: product.tags }
  });
  if (product.tags.length && !staging_product) {
    c++;
    print(product.name + ' old: ' + db2.products.findOne({ _id: product._id }).tags + ' new: ' + product.tags);
  }
  db2.products.update({ _id: product._id }, { $set: { tags: product.tags }});
});
print(c);
//quit();

c = 0;

// Compare
db1.products.find().forEach(function(product) {
  var keys = [
    '_id',
    'name',
    'description',
    'alt_names',
    'sizes'
  ];
  product = _.pick(product, keys);
  var staging_product = db2.products.findOne({ _id: product._id });
  //staging_product = _.omit(staging_product, [ '__v', 'hide_sizes_in_lists', 'include_in_slideshow' ]);
  staging_product = _.pick(staging_product, keys);
  if (!_.isEqual(product, staging_product)) {
    print(product.name);
    //var keys = [ 'name', 'description', 'sizes', 'alt_names', 'more_info' ];
    keys.forEach(function(field) {
      if (!!product[field] && !!staging_product[field] && !_.isEqual(product[field], staging_product[field])) {
        print('[ ' + field + '1 ]');
        print(product[field]);
        print('[ ' + field + '2 ]');
        print(staging_product[field]);
      }
    });
    printjson(product);
    printjson(staging_product);
    print('--------------------------------------------------------------------------------');
    c++;
    if (c > 50) { quit(); }
  }
});

print(c);
