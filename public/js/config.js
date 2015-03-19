
define([], function() {
  require.config({
    enforceDefine: true,
    baseUrl: '/js',
    paths: {
      jquery:               '../bower_components/jquery/dist/jquery',
      underscore:           '../bower_components/underscore-amd/underscore',
      backbone:             '../bower_components/backbone-amd/backbone',
      'backbone-forms':     '../bower_components/backbone-forms/distribution.amd/backbone-forms',
      'backbone-paginator': '../bower_components/backbone.paginator/lib/backbone.paginator',
      'form-editors':       '../bower_components/backbone-forms/distribution.amd/editors',
      jade:                 '../jade',
      markdown:             '../bower_components/marked/lib/marked',
      bootstrap:            '../bower_components/bootstrap/dist/js/bootstrap',
      template:             'lib/template',
      vex:                  '../bower_components/vex/js/vex',
      vex_dialog:           '../bower_components/vex/js/vex.dialog',
      youtube:              'https://www.youtube.com/iframe_api?noext',
      vexflow:              '../bower_components/vexflow/releases/vexflow-min',
      typeahead:            '../bower_components/typeahead.js/dist/typeahead.jquery',
      lunr:                 '../bower_components/lunr.js/lunr'
    },
    shim: {
      jade:                  { exports: 'jade' },
      'backbone-forms':      { deps: [ 'backbone' ] },
      'backbone-paginator':  { deps: [ 'backbone' ] },
      bootstrap:             { deps: [ 'jquery' ], exports: '$' },
      youtube:               { exports: 'YT' },
      vexflow:               { exports: 'Vex' },
      typeahead:             { deps: [ 'jquery' ], exports: '$' }
    }
  });
});

