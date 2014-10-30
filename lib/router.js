
var routes   = require('./routes'),
    express  = require('express'),
    router   = new express.Router();

// Routing
router.route('/login')
  .get(routes.loginForm)
  .post(routes.login);

router.get('/logout', routes.logout);

router.route('/cms/images')
  .get(routes.auth, routes.getImages)
  .post(routes.auth, routes.uploadFile, 
        routes.saveUploadedImage);

router.route('/cms/images/:id')
  .delete(routes.auth, routes.deleteImage)
  .put(routes.auth, routes.updateImage);

router.route('/cms/sounds')
  .get(routes.auth, routes.getSounds)
  .post(routes.auth, routes.uploadFile, 
        routes.saveUploadedSound);

router.route('/cms/sounds/:id')
  .put(routes.auth, routes.updateSound)
  .delete(routes.auth, routes.deleteSound);

router.route('/cms/pages/:page_id/content_blocks/:content_block_id')
  .get(routes.auth, routes.getPageContentBlock)
  .put(routes.auth, routes.savePageContentBlock);

router.route('*').get(routes.renderPage).put(routes.auth, routes.savePage);

module.exports = router;

