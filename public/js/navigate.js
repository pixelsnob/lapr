
export default ({
  
  attachLinks: ($links) => {
    Array.from($links).forEach($link => {
      if ($link.attached) {
        return;
      }
      $link.attached = true;
      $link.addEventListener('click', ev => {
        ev.preventDefault();
        ev.stopPropagation();
        const path = ev.target.getAttribute('href');
        if (path) {
          window.dispatchEvent(new CustomEvent('app-navigate', {
            detail: { path }
          }));
        }
        return false;
      });
    });
  }
});

