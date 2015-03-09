/**
 * tag_categories view
 * 
 */
define([
  './base',
  'views/admin/lists/items/tag_category'
], function(
  ListBaseView,
  TagCategoryView
) {

  return ListBaseView.extend({
    view: TagCategoryView,
    title: 'Tag Categories'
    
  });

});
