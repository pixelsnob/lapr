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
    },
    
    render: function() {
      this.setElement(template.render('partials/contact', {
      }));
      //var view = new ContentBlocksView({ name: 'contact' });
      //this.setElement(view.render().el);
      
      this.form = new ContactForm({ model: this.model });
      $form = this.form.render().el;
      this.$el.find('.form').html($form);

      var $button = $('<button>').text('Send').addClass('send');
      this.$el.find('form').append($button);
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
    }

  });
});

