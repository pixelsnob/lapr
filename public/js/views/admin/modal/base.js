/**
 * Bootstrap modal view
 * 
 */
define([
  'views/base',
  'template',
  'lib/events',
  'bootstrap',
  'lib/stacked_modals_fix'
], function(BaseView, template, global_events) {
  return BaseView.extend({
    
    events: {
      'click .save':    'save',
      'click .cancel':  'cancel',
      'click .remove':  function() { this.trigger('remove'); }
    },
    
    initialize: function() {
      this.setElement(template.render('admin/modal'));
      this.$el.addClass('admin-modal');
      this.$el.on('shown.bs.modal', _.bind(this.shown, this));
      this.$el.on('hidden.bs.modal', _.bind(this.hidden, this));
    },
    
    modal: function(opts) {
      this.$el.find('.modal-body').html(opts.body);
      if (opts.save_label) {
        this.$el.find('button.save').text(opts.save_label);
      }
      this.$el.modal({ backdrop: 'static', keyboard: false });
      if (opts.hide_cancel_button) {
        this.$el.find('button.btn.cancel').hide();
      }
      if (opts.show_remove_button) {
        this.$el.find('button.remove').removeClass('hide');
      }
      if (opts.title) {
        this.$el.find('h4').text(opts.title);
      }
    },
    
    shown: function() {
      var overlay = this.$el.find('.modal-backdrop');
      overlay.height(parseInt(overlay.height()) + 50);
      this.trigger('open');
      global_events.trigger('disable-window-keydowns');
    },

    hidden: function() {
      // For stacked modals: prevent removal of .modal-open body class
      // when other modals are still open
      if ($('.modal.in').length) {
        $('body').addClass('modal-open');
      }
      this.trigger('close');
      global_events.trigger('enable-window-keydowns');
    },
    
    save: function() {
      this.trigger('save');
      return false;
    },
    
    hide: function() {
      this.$el.modal('hide');
    },

    cancel: function(ev) {
      this.$el.modal('hide');
      this.trigger('cancel');
      return false;
    }

  });
});
