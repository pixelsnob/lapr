/** 
 * Configures markdown
 * 
 */
define([ 'markdown' ], function(markdown) {
  if (window.lapr.markdown_opts) {
    markdown.setOptions(window.lapr.markdown_opts);
  }
  return markdown;
});
