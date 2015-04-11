/**
 * pages view
 * 
 */
define([
  './base',
  './items/page'
], function(
  ListBaseView,
  PageView
) {

  return ListBaseView.extend({
    view: PageView,
    title: 'Pages'
    
  });
    
});

