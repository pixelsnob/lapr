/**
 * Bootstrap 3 doesn't support multiple modals. This fixes the z-index issues
 * involved with stacked backdrops
 * http://stackoverflow.com/questions/19305821/bootstrap-3-0-multiple-modals-overlay
 */
define([ 'jquery' ], function() {
  $(document).on('shown.bs.modal', '.modal', function () {
    var zIndex = 1040 + (10 * $('.modal:visible').length);
    $(this).css('z-index', zIndex);
    setTimeout(function() {
      $('.modal-backdrop').not('.modal-stack')
        .css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
  });
  $(document).on('hidden.bs.modal', '.modal', function () {
    $('.modal:visible').length && $(document.body).addClass('modal-open');
  });
});

