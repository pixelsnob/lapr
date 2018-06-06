
import AppContainer from 'containers/app';
import IndexContainer from 'containers/index';
import InstrumentsContainer from 'containers/instruments';

export default {
  
  create: store => {
    return {

      index: context => {
        const index_container = new IndexContainer(context, store);
        const app_container = new AppContainer(context, store, {
          main: index_container
        });
        return app_container;
      },

      instruments: context => {
        const instruments_container = new InstrumentsContainer(context, store);
        const app_container = new AppContainer(context, store, {
          main: instruments_container
        });
        return app_container;
      },

      error: err => `<h2>%$#@^%$#!!!!<br>Page not found!</h2>`

    };
  }
};


