
import EventEmitter from 'events';

const createNamespace = (dom_event_name, app_event_name) => {
  return `${dom_event_name}-${app_event_name}`;
};

class AppEvents extends EventEmitter {

  constructor() {
    super();
    this.dom_events = new Set;
  }

  registerDomEvent(dom_event_name, app_event_name, cb) {
    const ns = createNamespace(dom_event_name, app_event_name);
    if (this.dom_events.has(ns)) {
      return null; // promisify
    }

    this.dom_events.add(ns);

    document.body.addEventListener(dom_event_name, async ev => {
      const action_name = ev.target.getAttribute('data-action');
      if (action_name == app_event_name) {
        ev.preventDefault();
        ev.stopPropagation();

        if (typeof cb == 'function') {
          await cb(ev);
        }
      }
    });
  }
}

const events = new AppEvents;

export default events;

