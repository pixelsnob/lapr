/**
 * tags view
 * 
 */
define([
  './base',
  'views/admin/lists/items/tag'
], function(
  ListBaseView,
  TagView
) {

  return ListBaseView.extend({
    view: TagView,
    title: 'Tags'
  });

});
