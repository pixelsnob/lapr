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

  BaseView.extend({
    view: PageView,
    title: 'Pages'
    
  });
    
});

