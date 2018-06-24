
module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          'public/dist/css/main.css': 'public/less/main.less',
          'public/dist/css/admin.css': 'public/less/admin.less',
          'public/dist/css/vex.css': 'node_modules/vex-js/css/vex.css',
          'public/dist/css/vex-theme-plain.css': 'node_modules/vex-js/css/vex-theme-plain.css'
        }
      }
    },
    watch: {
      styles: {
        files: [ 'public/less/*.less' ],
        tasks: [ 'less' ],
        options: {
          nospawn: true
        }
      }
    },
		copy: {
			main: {
				files: [
					// includes files within path
					{
            expand: true,
            cwd: 'node_modules/bootstrap/fonts',
            src: [ '*' ],
            dest: 'public/dist/fonts/',
            filter: 'isFile'
          },
					{
            expand: true,
            cwd: 'node_modules/@webcomponents/template',
            src: [ 'template.js' ],
            dest: 'public/dist/webcomponents/',
            filter: 'isFile'
          }
				]
			}
		}
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', [ 'less', 'copy' ]);
};


