
import events from 'events/app';

export default {
  register: (dom_event, app_event, cb) => {
    document.body.addEventListener(dom_event, async ev => {
      const action_name = ev.target.getAttribute('data-action');
      if (action_name == app_event) {
        ev.preventDefault();
        ev.stopPropagation();
        events.emit(action_name, ev);
        if (typeof cb == 'function') {
          cb(ev);
        }
      }
    });
    return events;
  }
};
