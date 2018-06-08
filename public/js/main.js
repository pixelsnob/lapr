/**
 * Main client-side initialization file
 * 
 */
import Actions from 'actions';
import routes from 'routes';
import Router from 'router';
import Render from 'render';
import Store from 'store';
import events from 'events/app';

const store = new Store;

const actions = Actions.create(store);
const router = Router.create(routes, actions);

const getMountPoint = () => document.querySelector('body');

if (!window.__lapr_ssr) {

  // Client
  document.addEventListener('DOMContentLoaded', async ev => {
    const render =  new Render(getMountPoint());
    await store.products.fetch();
    const dispatch = async path => {
      try {
        await router.resolve(path).then(render);
      } catch (err) {
        console.error(err);
      }
    };
    events.registerDomEvent('click', 'app:navigate', async ev => {
      const path = ev.target.getAttribute('href');
      window.history.pushState(null, null, path);
      await dispatch(path);
    });
    events.on('app:refresh', async ev => {
      await dispatch(location.pathname);

    });
    window.addEventListener('popstate', async () => {
      await dispatch(location.pathname);
    });
    await dispatch(location.pathname);
    console.log(store.refs);
  });

} else {

  // Server
  window.__lapr_dispatch = async path => {
    try {
      const data = JSON.parse(window.localStorage.getItem('data'));
      store.products.hydrate(data);
      const render =  new Render(getMountPoint());
      await router.resolve(path).then(render);
    } catch (err) {
      console.error(err);
    }
  };
}

