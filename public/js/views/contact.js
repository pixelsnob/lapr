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
  content_blocks_view,
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

      content_blocks_view.setElement(this.$el).render();

      $(window).scrollTop(0);
      return this;
    },

    send: function(ev) {
      var errors = this.form.commit(),
          obj    = this;
      if (!errors) {
        this.model.set('csrf-param', $('meta[name=csrf-param]').attr('content'));
        this.model.save().done(function() {
          obj.$el.find('.form').html("Thanks! We'll get back to you shortly."); 
          obj.model.clear();
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

