/**
 * Admin app init
 * 
 */
define([
  'views/admin/app'
], function(
  AdminAppView
) {
  var admin_app = new AdminAppView({
    el:       $(document.body),
    products: {}
  });
  console.log(admin_app);
});


