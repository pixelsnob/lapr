
import AppContainer from 'containers/app';
import IndexContainer from 'containers/index';
import InstrumentsContainer from 'containers/instruments';
import ProductCategoriesNav from 'containers/product_categories_nav';
import TagsNav from 'containers/tags_nav';

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
        const product_categories_nav = new ProductCategoriesNav(
          context,
          store.refs.product_categories //<
        );
        const instruments_container = new InstrumentsContainer(context, store, {
          sidebar: product_categories_nav
        });
        const app_container = new AppContainer(context, store, {
          main: instruments_container
        });
        return app_container;
      },

      'sound-search': context => {
        const tags_nav = new TagsNav(context, store);
        const instruments_container = new InstrumentsContainer(context, store, {
          sidebar: tags_nav
        });
        const app_container = new AppContainer(context, store, {
          main: instruments_container
        });
        return app_container;
        
      },

      error: err => `<h2>%$#@^%$#!!!!<br>Page not found!</h2>`

    };
  }
};


