
export default [

  {
    path: '/',
    action: 'index'
  },
  {
    path: '/instruments',
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
    path: '/instruments/tags/:tags',
    action: 'sound-search'
  },
  {
    path: '/instruments/:slug/:id',
    action: 'instrument-details'
  },
  {
    path: '/contact',
    action: 'contact'
  }
];
