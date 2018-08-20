
import IndexPageContainer from 'containers/pages/index';
import SoundSearchPageContainer from 'containers/pages/sound_search';
import ContactPageContainer from 'containers/pages/contact';

/*import InstrumentsPageContainer from 'containers/pages/instruments';
import InstrumentsLandingPageContainer from 'containers/pages/instruments_landing';
import SoundSearchPageContainer from 'containers/pages/sound_search';
import InstrumentDetailsPageContainer from 'containers/pages/instrument_details';
import ContactPageContainer from 'containers/pages/contact';*/

import ErrorContainer from 'containers/error';

export default {
  
  create: store => {

    return {

      index: ({ params }) => new IndexPageContainer(params, store),

      'instruments-landing': ({ params }) => new IndexPageContainer(params, store),

      'sound-search': ({ params }) => new SoundSearchPageContainer(params, store),

      contact: ({ params }) => new ContactPageContainer(params, store),

      error: err => new ErrorContainer(err)


      /*instruments: context => new InstrumentsPageContainer(context.params, store),

      'instruments-landing': context => new InstrumentsLandingPageContainer(context.params, store),

      'sound-search': context => new SoundSearchPageContainer(context.params, store),

      'instrument-details': context => new InstrumentDetailsPageContainer(context.params, store),*/
      
    };
  }
};


