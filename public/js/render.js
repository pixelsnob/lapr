
import diffhtml from 'diffhtml';
import events from 'events/app';

export default $el => {

  return view => {

    document.body.className = '';

    if (typeof view.render == 'function') {
      try {
        const render_output = view.render();
        if (render_output.error) {
          diffhtml.innerHTML($el, `<p class="error">Error: ${render_output.error}</p>`);
        } else {
          diffhtml.outerHTML($el, render_output); 
        }
      } catch (err) {
        diffhtml.innerHTML($el, '<p class="error">An error has ocurred</p>');
      }
    } else {
      diffhtml.outerHTML($el, ''); 
    }

    // Notify components when they are connected
    events.emit('connected', $el);

  };
};

