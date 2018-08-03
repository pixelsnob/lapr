/** 
 * CSRF token utils
 * 
 */
export default {
  
  getParam: function() {
    return window.__lapr_locals.csrf_param;
  }
};

