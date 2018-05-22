/**
 * Product images list/editor
 * 
 * 
 */
import MultiSelectEditorView from './multi_select';
import template from 'lib/template';
import ImagesCollection from 'collections/images';
import ProductImageEditorView from 'forms/editors/product_image';
import Sortable from 'sortablejs';

export default Backbone.Form.editors.Select.extend({

  initialize: function(opts) {
    Backbone.Form.editors.Select.prototype.initialize.apply(this, arguments);
    const images_collection = new ImagesCollection;
    this.images_collection_deferred = images_collection.fetch();
  },

  // Creates two lists: one with images assigned to the current product, and
  // the other with all unassigned images
  render: function() {
    this.setElement(template.render('admin/product_images'));
    this.images_collection_deferred.then(images => {
      const product_image_ids = this.model.get('images');
      const $product_images_ul = this.$el.find('.product-images ul');
      const $images_ul = this.$el.find('.images ul');
      // Create an array of image objects that belong to this product;
      // preserving sort order is important here
      const product_images = product_image_ids.map(product_image_id => {
        return images.find(image => image._id == product_image_id);
      });
      // Populate list of product images, and make it sortable & draggable
      product_images.forEach(product_image => {
        const image_view = new ProductImageEditorView({
          image: product_image,
          key: this.key,
          editor_id: this.id
        });
        $product_images_ul.append(image_view.render().el);
      });
      Sortable.create($product_images_ul.get(0), {
        draggable: 'li',
        group: { name: 'product-images', put: 'images' }
      });
      // Populate list of all images, and make it sortable & draggable
      // Filter out assigned images
      images.filter(image =>
        !product_images.find(product_image =>
          product_image._id == image._id
        )
      ).forEach(image => {
        const image_view = new ProductImageEditorView({
          image,
          key: this.key,
          editor_id: this.id
        });
        $images_ul.append(image_view.render().el);
      });
      Sortable.create($images_ul.get(0), {
        draggable: 'li',
        group: { name: 'images', put: 'product-images' },
        sort: false
      });

    });
    return Backbone.Form.editors.Hidden.prototype.render.apply(this, arguments);
  },

  // Get an array of image ids, maintaining sort order
  getValue: function() {
    return Array.from(
      this.$el.find('.product-images input[type="hidden"]')
    ).map(input => input.value);
  }

});
