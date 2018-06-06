
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
    path: '/instruments/categories/:category/sort/:sort_dir',
    action: 'instruments'
  }
];
