/**
 * 
 */
define([
  'views/base',
  'template'
], function(
  BaseView, template
) {
  return BaseView.extend({
    
    events: {
      'click .close': 'closeModal'
    },

    initialize: function() {
      this.setElement(template.render('partials/modal'));
      this.$el.on('hidden.bs.modal', _.bind(this.close, this));
      // "Unsupported" stacked modals fix
      // http://stackoverflow.com/questions/19305821/bootstrap-3-0-multiple-modals-overlay
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
    },

    render: function(opts) {
      this.$el.find('.modal-body').append(opts.body);
      this.$el.modal();
      return this;
    },

    closeModal: function() {
      this.$el.modal('hide');
    },

    onClose: function() {
      this.trigger('close');
    }

  });
});

