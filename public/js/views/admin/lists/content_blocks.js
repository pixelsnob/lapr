/**
 * content_blocks view
 * 
 */
define([
  './base',
  './items/content_block'
], function(
  ListBaseView,
  ContentBlockView
) {

  return ListBaseView.extend({
    view: ContentBlockView,
    title: 'Content Blocks'
  });
    
});

