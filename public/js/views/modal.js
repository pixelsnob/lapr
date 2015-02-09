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
    },

    render: function(opts) {
      this.$el.find('.modal-body').append(opts.body);
      this.$el.modal();
      return this;
    },

    closeModal: function() {
      this.$el.modal('hide');
      this.close();
      this.trigger('close');
    }

  });
});

