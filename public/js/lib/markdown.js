/** 
 * Configures markdown
 * 
 */
import markdown from 'marked';

if (window.lapr.markdown_opts) {
  markdown.setOptions(window.lapr.markdown_opts);
}
export default markdown;
