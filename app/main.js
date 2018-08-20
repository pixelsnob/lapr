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
import events from 'events/app';

const actions = Actions.create(store);
const router = Router.create(routes, actions);

const getMountPoint = () => document.querySelector('body');

if (!window.__lapr_ssr) {

  // Client
  document.addEventListener('DOMContentLoaded', async ev => {
    const $root = getMountPoint();
    const render =  new Render($root);
    const dispatch = async path => {
      try {
        await router.resolve(path).then(render);
      } catch (err) {
        console.error(err);
      }
    };

    await store.products.fetch();

    store.products.createProductsIndex();

    //app_events.registerDomEvent('click', 'click:navigate', async path => {
    //  app_events.emit('app:navigate', path);
    //});

    events.app.on('app:navigate', async path => {
      history.pushState({ previous: location.pathname }, null, path);
      await dispatch(path);
    });

    events.app.on('app:refresh', async ev => {
      await dispatch(location.pathname);
    });

    window.addEventListener('popstate', async ev => {
      await dispatch(location.pathname);
    });

    window.addEventListener('scroll', ev => {
      events.app.emit('app:scroll', ev);
    });

    await dispatch(location.pathname);
  });

} else {

  // Server
  window.__lapr_dispatch = (path, data) => {
    try {
      
      const $root = getMountPoint();
      const render =  new Render($root);

      store.products.hydrate(data);

      router.resolve(path).then(render);

      // App events are unecessary on back-end
      //app_events.removeAllListeners();

    } catch (err) {
      console.error(err);
    }
  };
}

