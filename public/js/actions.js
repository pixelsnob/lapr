
import IndexContainer from 'containers/index';
import InstrumentSummariesListContainer from 'containers/instrument_summaries_list';

import InstrumentDetailsListContainer from 'containers/instrument_details_list';
import ContactContainer from 'containers/contact';
import ErrorComponent from 'components/error';

import ProductCategoriesNavContainer from 'containers/product_categories_nav';
import ContentBlocksContainer from 'containers/content_blocks';
import TagsNavContainer from 'containers/tags_nav';

export default {
  
  create: store => {

    return {

      index: context => {
        new ContentBlocksContainer(context, store);
        return new IndexContainer(context, store);
      },

      instruments: context => {
        store.selected_categories.setFromSlug(context.params.category);
        store.filtered_products.sort_mode = 'default';
        store.products.filterByCategory();

        const product_categories_nav = new ProductCategoriesNavContainer(
          context,
          store.product_categories
        );
        const instruments_container = new InstrumentSummariesListContainer(context, store, {
          sidebar: product_categories_nav
        });

        return instruments_container;
      },

      'sound-search': context => {
        const selected_tags = context.params.tags ? context.params.tags.split(',') : [];
        store.selected_tags.setFromArray(selected_tags);
        store.filtered_products.sort_mode = 'default';
        store.products.filterByTags();

        const tags_nav = new TagsNavContainer(context, store);
        const instruments_container = new InstrumentSummariesListContainer(context, store, {
          sidebar: tags_nav
        });
        return instruments_container;
      },

      'instrument-details': context => {
        return new InstrumentDetailsListContainer({
          ...context,
          params: {
            ...context.params,
            grid_width: 8,
            list: store.filtered_products.models
          }
        }, store);
      },

      contact: context => {
        new ContentBlocksContainer(context, store);
        return new ContactContainer(context, store);
      },

      error: err => {
        return new ErrorComponent(err);
      }

    };
  }
};


