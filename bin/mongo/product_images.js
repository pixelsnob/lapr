
db.images.drop();
//db.createCollection('images_test');

var _id = 1;

db.products.find().forEach(function(product) {
  if (!product.image) {
    print('no image');
    return null;
  }
  var doc = db.images.insertOne({ name: product.image, _id });
  db.products.update({
    _id: product._id
  }, {
    $unset: { image: '' },
    $push: { images: doc.insertedId }
  });
  _id++;

});
