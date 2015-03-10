/**
 * images view
 * 
 */
define([
  './base',
  './items/image',
  'collections/images_pageable'
], function(
  ListBaseView,
  ImageView,
  ImagesCollection
) {

  return  ListBaseView.extend({
    view: ImageView,
    title: 'Images',
    paged: true/*,
    
    initialize: function(opts) {
      ListBaseView.prototype.initialize.apply(this, arguments);
      this.collection = new ImagesCollection(this.collection.models); 
      this.collection.getFirstPage();
      this.listenTo(this.collection, 'change add remove', this.render);
    }*/

  });
    
});

