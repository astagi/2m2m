module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ["messages.nosql"],
    exec: {
      resize_images: {
        command: 'mogrify -path photos/thumbs -resize 400x400^ \
          -gravity center -extent 400x400 photos/*.*',
        stdout: false,
        stderr: false
      }
    },
    uglify: {
      options: {
        mangle: false,
        banner: '/*! Project: <%= pkg.name %> | Version #: <%= pkg.version %> | Created: <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'public/js/2m2m.min.js': ['public/js/2m2mmain.js', 'public/js/2m2mleap.js',
            'public/js/2m2mcarousel.js', 'public/js/2m2mcommon.js'],
          'public/js/2m2mnewmessage.min.js': ['public/js/2m2mcommon.js', 'public/js/2m2mnewmessage.js'],
          'public/js/2m2mnewphoto.min.js': ['public/js/2m2mcommon.js', 'public/js/2m2mnewphoto.js']
        }
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('resize', ['exec']);
};