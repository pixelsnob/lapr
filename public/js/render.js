
import diffhtml from 'diffhtml';
import events from 'events/app';

export default $el => {

  return view => {

    if (typeof view.render == 'function') {
      diffhtml.outerHTML($el, view.render()); 
    } else {
      diffhtml.outerHTML($el, ''); 
    }

    // Notify components that they are connected
    events.emit('connected', $el);

    //events.on('force-render', ev => {
    //  diffhtml.outerHTML($el, view.render()); 
    //});
  };
};

