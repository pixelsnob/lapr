
// A simple DOM event aggregator/delegator

// "focus" and "blur" events don't bubble up: we need to set "useCapture" param to true when
// calling document.addEventListener
const USE_CAPTURE_LISTENERS = [ 'focus', 'blur' ];

export default class {

  constructor() {
    this.events = new Map;
  }

  addEventListener(event_name, selector, func) {
    // Add only one listener per event type
    if (!this.events.has(event_name)) {
      const event_listener = ev => {
        const event = this.events.get(event_name);
        if (!event) {
          return null;
        }
        for (let [ selector, func ] of event.selectors) {
          const $els = document.body.querySelectorAll(selector);
          if (Array.from($els).find($el => ev.target === $el)) {
            func(ev);
          }
        }
      };
      const listener_opts = USE_CAPTURE_LISTENERS.includes(event_name);
      this.events.set(event_name, {
        listener: event_listener,
        listener_opts,
        selectors: new Map

      });
      document.addEventListener(event_name, event_listener, listener_opts);
    }
    // Add a selector/callback to the queue that will be checked in the
    // event listener above
    this.events.get(event_name).selectors.set(selector, func);
  }

  removeEventListener(event_name, selector) {
    if (!this.events.has(event_name)) {
      return null;
    }
    const event = this.events.get(event_name);
    event.selectors.delete(selector);
    // Remove event completely if no selectors are left
    if (event.selectors.size == 0) {
      document.removeEventListener(event_name, event.listener, event.listener_opts);
      this.events.delete(event_name);
    }
  }

  removeAllEventListeners() {
    for (let [ event_name, event ] of this.events) {
      document.removeEventListener(event_name, event.listener, event.listener_opts);
    }
    this.events.clear();
  }

}

