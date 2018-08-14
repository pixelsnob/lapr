
import diffhtml from 'diffhtml';
import events from 'events/app';

export default $root => {

  return view => {

    if (typeof view.render == 'function') {
      try {

        if (!window.__lapr_ssr) {
          events.app.emit('disconnected');
        }

        // Perform "diff" on root element
        diffhtml.outerHTML($root, view.render()); 

        if (!window.__lapr_ssr) {
          events.app.emit('connected', $root);
        }

      } catch (err) {
        console.error(err);
        diffhtml.innerHTML($root, '<p class="error">An error has occurred</p>');
      }

    } else {
      diffhtml.outerHTML($root, ''); 
    }
  };
};

