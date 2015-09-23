
// Adds a period to all descriptions that do not have one at the end

var db1 = db.getSiblingDB('lapr'),
    db2 = db.getSiblingDB('lapr-staging');

var c = 0;

db1.products.find({ description: { $not: /\.( *)?$/ }}).forEach(function(product) {
  if (product.description.trim().length) {
    print('old: ' + product.description);
    var description = product.description.trim().replace(/\.( *)?$/, ''); 
    description += '.';
    db1.products.update({ _id: product._id }, { $set: { description: description }});
    c++;
    print('new: ' + description);
    print('------------------------');
  }
});
print(c + ' changed');

