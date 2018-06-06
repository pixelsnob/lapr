/**
 * Main client-side initialization file
 * 
 */
import Actions from './actions';
import routes from './routes';
import Router from './router';
import Render from './render';
import navigate from './navigate';
import events from 'events/dom';

//
import ProductsCollection from 'collections/products';
const store = new ProductsCollection;
//

const getMountPoint = () => document.querySelector('body');

const actions = Actions.create(store);
const router = Router.create(routes, actions);

if (!window.__lapr_ssr) {

  // Client
  document.addEventListener('DOMContentLoaded', async ev => {
    const render =  new Render(getMountPoint());
    await store.fetch();
    const dispatch = async path => {
      try {
        await router.resolve(path).then(render);
      } catch (err) {
        console.error(err);
      }
    };
    events.register('click', 'app:navigate', async ev => {
      const path = ev.target.getAttribute('href');
      window.history.pushState(null, null, path);
      await dispatch(path);
    });
    window.addEventListener('popstate', async () => {
      await dispatch(location.pathname);
    });
    await dispatch(location.pathname);
  });

} else {

  // Server
  window.__lapr_dispatch = async path => {
    try {
      const data = JSON.parse(window.localStorage.getItem('data'));
      store.hydrate(data);
      const render =  new Render(getMountPoint());
      await router.resolve(path).then(render);
    } catch (err) {
      console.error(err);
    }
  };
}

