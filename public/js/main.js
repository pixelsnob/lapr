/**
 * Main client-side initialization file
 * 
 */
import Actions from './actions';
import routes from './routes';
import Router from './router';
import Render from './render';
import navigate from './navigate';

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
        //navigate.attachLinks(document.querySelectorAll('a[navigate]'));
      } catch (err) {
        console.error(err);
      }
    };
    window.addEventListener('app-navigate', async ev => {
      window.history.pushState(null, null, ev.detail.path);
      await dispatch(ev.detail.path);
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

