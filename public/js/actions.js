
import InstrumentsPageContainer from 'containers/pages/instruments';
import SoundSearchPageContainer from 'containers/pages/sound_search';
import InstrumentDetailsPageContainer from 'containers/pages/instrument_details';

import IndexContainer from 'containers/index';

import ContactContainer from 'containers/contact';
import ErrorComponent from 'components/error';

import ContentBlocksContainer from 'containers/content_blocks';

export default {
  
  create: store => {

    return {

      index: context => {
        new ContentBlocksContainer(context, store);
        return new IndexContainer(context, store);
      },

      instruments: context => {
        return new InstrumentsPageContainer(context, store);
      },

      'sound-search': context => {
        return new SoundSearchPageContainer(context, store);
      },

      'instrument-details': context => {
        return new InstrumentDetailsPageContainer(context, store);
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


