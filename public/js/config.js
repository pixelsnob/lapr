
define([], function() {
  require.config({
    enforceDefine: true,
    baseUrl: '/js',
    paths: {
      jquery:           '../bower_components/jquery/dist/jquery',
      underscore:       '../bower_components/underscore-amd/underscore',
      backbone:         '../bower_components/backbone-amd/backbone',
      'backbone-forms': '../bower_components/backbone-forms/distribution.amd/backbone-forms',
      jade:             '../jade',
      markdown:         '../bower_components/marked/lib/marked',
      bootstrap:        '../bower_components/bootstrap/dist/js/bootstrap',
      template:         'lib/template',
      vex:              '../bower_components/vex/js/vex',
      vex_dialog:       '../bower_components/vex/js/vex.dialog',
      'cms-lib':        '../cms/js'
    },
    shim: {
      jade:              { exports: 'jade' },
      'backbone-forms':  { deps: [ 'backbone' ] },
      bootstrap:         { deps: [ 'jquery' ], exports: '$' }
    }
  });
});

