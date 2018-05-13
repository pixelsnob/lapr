/** 
 * CSRF token utils
 * 
 */
export default {
  
  getParam: function() {
    return $('meta[name=csrf-param]').attr('content');
  }
};

