/**
 * Main client-side initialization file
 * 
 */

//import './polyfills';

import Actions from 'actions';
import routes from 'routes';
import Router from 'router';
import Render from 'render';
import store from 'store';
import app_events from 'events/app';
//import AppContainer from 'containers/app';

import ProductsTextSearchContainer from 'containers/products_text_search';

const actions = Actions.create(store);
const router = Router.create(routes, actions);

//const app_container = new AppContainer(null, store);
const getMountPoint = () => document.querySelector('#main');

if (!window.__lapr_ssr) {

  // Client

  document.addEventListener('DOMContentLoaded', async ev => {
    const render =  new Render(getMountPoint()); //<
    const dispatch = async path => {
      try {
        await router.resolve(path).then(render);
      } catch (err) {
        console.error(err);
      }
    };
    //app_container.render();

    await store.products.fetch();

    // maybe move this back to app container?
    const products_text_search_container = new ProductsTextSearchContainer(
      null,
      store,
      document.body.querySelector('.text-search')
    );
    products_text_search_container.render();

    app_events.registerDomEvent('click', 'click:navigate', async path => {
      app_events.emit('app:navigate', path);
    });

    app_events.on('app:navigate', async path => {
      history.pushState({ previous: location.pathname }, null, path);
      await dispatch(path);
    });

    app_events.on('app:refresh', async ev => {
      await dispatch(location.pathname);
    });

    window.addEventListener('popstate', async ev => {
      await dispatch(location.pathname);
    });

    window.addEventListener('scroll', ev => {
      app_events.emit('app:scroll', ev);
    });

    await dispatch(location.pathname);
  });

} else {

  // Server
  window.__lapr_dispatch = (path, data) => {
    try {

      store.products.hydrate(data);
      const render =  new Render(getMountPoint());

      router.resolve(path).then(render);

      // maybe move this back to app container?
      const products_text_search_container = new ProductsTextSearchContainer(
        null,
        store,
        document.body.querySelector('.text-search')
      );
      products_text_search_container.render();

      // App events are unecessary on back-end
      app_events.removeAllListeners();

    } catch (err) {
      console.error(err);
    }
  };
}

