
const db = require('../../models');
console.log(db);
(async () => {
  try {
    //await db.connection.collections['images'].drop();
    const products = await db.model('Product').find();
    for (let product of products) {
      product.images = [];
      if (product.image) {
        // Check for existing
        let existing_image = await db.model('Image').findOne({ name: product.image });
        if (existing_image) {
          product.images = [ existing_image._id ];
          console.log(`Duplicate image ${product.image}`);
        } else {
          const image = await db.model('Image').create({ name: product.image });
          product.images = [ image._id ];
        }
      }
      product.save();
    }
    db.connection.close();
  } catch (err) {
    console.error(err);
    db.connection.close();
  }
})();
