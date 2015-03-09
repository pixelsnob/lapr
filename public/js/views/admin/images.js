/**
 * images view
 * 
 */
define([
  'views/base',
  'views/admin/list_mixin',
  'views/admin/image',
  'collections/images_pageable'
], function(
  BaseView,
  AdminListMixin,
  ImageView,
  ImagesCollection
) {

  var view = BaseView.extend({
    view: ImageView,
    title: 'Images',
    paged: true,
    
    initialize: function(opts) {
      // this is hacky
      this.collection = new ImagesCollection(this.collection.models); 
      this.collection.getFirstPage();
      // change mixin to parent class so initialize can be overridden?
      this.listenTo(this.collection, 'change add remove', this.render);
    }

  });

  return view.mixin(AdminListMixin);
    
});

