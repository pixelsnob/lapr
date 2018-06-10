
import IndexContainer from 'containers/index';
import InstrumentsContainer from 'containers/instruments';
import ContactContainer from 'containers/contact';
import ProductCategoriesNavContainer from 'containers/product_categories_nav';
import TagsNav from 'containers/tags_nav';

export default {
  
  create: store => {

    return {

      index: context => {
        return new IndexContainer(context, store);
      },

      instruments: context => {

        store.filtered_products.reset(store.populated_products);
        store.selected_categories.setFromSlug(context.params.category);
        store.products.filterByCategory();
        //store.filtered_products.sort();

        const product_categories_nav = new ProductCategoriesNavContainer(
          context,
          store.product_categories
        );
        const instruments_container = new InstrumentsContainer(context, store, {
          sidebar: product_categories_nav
        });
        return instruments_container;
      },

      'sound-search': context => {

        store.filtered_products.reset(store.populated_products);
        const selected_tags = context.params.tags ? context.params.tags.split(',') : [];
        store.selected_tags.setFromArray(selected_tags);
        store.products.filterByTags();
        //store.filtered_products.sort();

        const tags_nav = new TagsNav(context, store);
        const instruments_container = new InstrumentsContainer(context, store, {
          sidebar: tags_nav
        });
        return instruments_container;
      },

      contact: context => {
        return new ContactContainer(context, store);
      },

      error: err => `<h2>%$#@^%$#!!!!<br>Page not found!</h2>`

    };
  }
};


