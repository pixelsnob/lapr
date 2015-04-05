/**
 * Contact page view
 * 
 */
define([
  'views/base',
  'models/contact',
  'forms/contact',
  'template'
], function(
  BaseView,
  ContactModel,
  ContactForm,
  template
) {
  
  return BaseView.extend({
    
    form: null,
    
    model: new ContactModel,
    
    events: {
      'click .send':       'send'
    },

    initialize: function(opts) {
    },
    
    render: function() {
      this.setElement(template.render('partials/contact'))
      
      this.form = new ContactForm({ model: this.model });
      $form = this.form.render().el;
      this.$el.find('.form').html($form);

      var $button = $('<button>').text('Send').addClass('send');
      this.$el.find('form').append($button);
      return this;
    },

    send: function(ev) {
      var errors = this.form.commit();
      if (!errors) {
        this.model.save().done(function() {
          console.log(arguments);
        }).fail(this.showServerError);
      }
      return false;
    }

  });
});

