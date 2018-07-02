
import IndexPageContainer from 'containers/pages/index';
import InstrumentsPageContainer from 'containers/pages/instruments';
import SoundSearchPageContainer from 'containers/pages/sound_search';
import InstrumentDetailsPageContainer from 'containers/pages/instrument_details';
import ContactPageContainer from 'containers/pages/contact';

import ErrorComponent from 'components/error';

export default {
  
  create: store => {

    return {

      index: context => new IndexPageContainer(context, store),

      instruments: context => new InstrumentsPageContainer(context, store),

      'sound-search': context => new SoundSearchPageContainer(context, store),

      'instrument-details': context => new InstrumentDetailsPageContainer(context, store),

      contact: context => new ContactPageContainer(context, store),

      error: err => new ErrorComponent(err)

    };
  }
};


