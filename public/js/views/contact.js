/**
 * Contact page view
 * 
 */
define([
  'views/base',
  'models/contact',
  'forms/contact',
  'views/content_blocks',
  'template'
], function(
  BaseView,
  ContactModel,
  ContactForm,
  ContentBlocksView,
  template
) {
  
  return BaseView.extend({
    
    form: null,
    
    model: new ContactModel,
    
    events: {
      'click .send':       'send'
    },

    initialize: function(opts) {
      this.setElement(template.render('partials/contact'));
    },
    
    render: function() {
      this.form = new ContactForm({ model: this.model });
      $form = this.form.render().el;
      this.$el.find('.form').html($form);
      
      var $button = $('<button>').text('Send').addClass('send');
      this.$el.find('form').append($button);

      var $iframe = this.$el.find('.google-map iframe'),
          src     = 'https://www.google.com/maps/embed/v1/place'            +
                    '?q=26450+Ruether+Ave.,+%23208+Santa+Clarita,+CA+91350' +
                    '&key=AIzaSyAjUkPxGyadh5relom7cM9JgAAm7dLa3l8';
      $iframe.prop('src', src);
      return this;
    },

    send: function(ev) {
      var errors = this.form.commit(),
          obj    = this;
      if (!errors) {
        this.model.save().done(function() {
          obj.$el.find('.form').html('Thanks'); 
        }).fail(this.showServerError);
      }
      return false;
    },

    onClose: function() {
      this.model.unbind();
      this.form.unbind();
    }

  });
});

