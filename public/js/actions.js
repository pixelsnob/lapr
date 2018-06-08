
import AppContainer from 'containers/app';
import IndexContainer from 'containers/index';
import InstrumentsContainer from 'containers/instruments';
import ContactContainer from 'containers/contact';
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

        store.refs.filtered_products.reset(store.toJSON());
        store.refs.selected_categories.setFromSlug(context.params.category);
        store.filterByCategory();
        store.refs.filtered_products.sort();

        const product_categories_nav = new ProductCategoriesNav(
          context,
          store.refs.product_categories
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

        store.refs.filtered_products.reset(store.toJSON());
        const selected_tags = context.params.tags ? context.params.tags.split(',') : [];
        store.refs.selected_tags.setFromArray(selected_tags);
        store.filterByTags();
        store.refs.filtered_products.sort();

        const tags_nav = new TagsNav(context, store);
        const instruments_container = new InstrumentsContainer(context, store, {
          sidebar: tags_nav
        });
        const app_container = new AppContainer(context, store, {
          main: instruments_container
        });
        return app_container;
      },

      contact: context => {
        const contact_container = new ContactContainer(context, store);
        const app_container = new AppContainer(context, store, {
          main: contact_container
        });
        return app_container;
      },

      error: err => `<h2>%$#@^%$#!!!!<br>Page not found!</h2>`

    };
  }
};


