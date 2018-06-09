/** 
 * Template access
 * 
 */

export default {
  render: function(template_path, opts) {
    return jade.render(template_path, opts);
  }
};
