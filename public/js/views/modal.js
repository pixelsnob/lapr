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
    },

    render: function(opts) {
      this.$el.find('.modal-body').append(opts.body);
      this.$el.modal();
      // Attempt to eliminate space at bottom of .modal-backdrop due
      // to adding content to it dynamically (I guess?)
      var modal_h = this.$el.find('.modal-content').height() + 100,
          body_h  = this.$el.height() + 50,
          h       = (body_h > modal_h ? body_h : modal_h);
      this.$el.find('.modal-backdrop').height(h);
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

