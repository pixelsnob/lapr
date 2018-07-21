
export default [

  {
    path: '/',
    action: 'index'
  },
  {
    path: '/instruments',
    action: 'instruments-landing'
  },
  {
    path: '/instruments/categories/:category/instrument/:slug/:instrument_id',
    action: 'instruments'
  },
  {
    path: '/instruments/categories/:category',
    action: 'instruments'
  },
  {
    path: '/instruments/tags',
    action: 'sound-search'
  },
  {
    path: '/instruments/tags/:tags/instrument/:slug/:instrument_id',
    action: 'sound-search'
  },
  {
    path: '/instruments/tags/:tags',
    action: 'sound-search'
  },
  {
    path: '/instruments/:slug/:product_id',
    action: 'instrument-details'
  },
  {
    path: '/contact',
    action: 'contact'
  }
];
