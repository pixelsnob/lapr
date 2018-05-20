
db.images.drop();
//db.createCollection('images_test');

let _id = 1;

db.products.find().forEach(function(product) {
  if (!product.image) {
    return null;
  }
  var doc = db.images.insertOne({ name: product.image, _id });
  print(doc.insertedId);
  db.products.update({
    _id: product._id
  }, {
    $unset: { /*image: ''*/ },
    $push: { images: doc.insertedId }
  });
  _id++;

});
