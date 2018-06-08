
import template from 'lib/template';
import events from 'events/app';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
    this.$el = document.createElement('template');
    document.body.className = 'contact'; //<<<<<<<<<<
  }

  render() {
    this.$el.innerHTML = template.render('partials/contact', {});
    // Old backbone forms html -- refactor this
    // add csrf
    this.$el.content.querySelector('.form').innerHTML = `
      <form action="/contact" method="post">
        <div data-fieldsets="">
          <fieldset data-fields="">
            <div>
              <label for="c2_name">Name</label>
              <div>
                <span data-editor="">
                  <input id="c2_name" name="name" type="text">
                </span>
                <div data-error="">
                </div>
                <div></div>
              </div>
              <div>
                <label for="c2_email">Email</label>
                <div>
                  <span data-editor=""><input id="c2_email" name="email" type="text"></span>
                  <div data-error=""></div>
                  <div></div>
                </div>
              </div>
              <div>
                <label for="c2_phone">Phone</label>
                  <div>
                    <span data-editor=""><input id="c2_phone" name="phone" type="text"></span>
                    <div data-error=""></div>
                    <div></div>
                  </div>
              </div>
              <div>
                <label for="c2_comments">Comments</label>
                <div>
                  <span data-editor="">
                    <textarea id="c2_comments" name="comments"></textarea>
                  </span>
                  <div data-error=""></div>
                  <div></div>
                </div>
              </div>
            </fieldset>
          </div>
        <button class="send">Send</button>
      </form>
    `;
    return this.$el.content.cloneNode(true);
    
  }

}

