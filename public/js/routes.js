
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
    path: '/instruments/',
    action: 'sound-search'
  },
  {
    path: '/contact',
    action: 'contact'
  }
];
