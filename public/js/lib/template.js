/** 
 * Template access
 * 
 */
//import _ from 'underscore';
import markdown from './markdown';

export default {
  render: function(template_path, opts) {
    opts = _.extend(opts || {}, {
      // Don't output content here, but do return an element to later
      // attach it to
      outputContentBlock: function() {
        return jade.render('partials/content_block', {
          content: ''
        });
      },
      // Front end gets content blocks on an as-needed basis
      content_blocks: [],
      // Used to show logged-in stuff
      user: window.lapr.user,
      markdown: markdown
    });
    return $(jade.render(template_path, opts));
  }
};
