module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: false,
        banner: '/*! Project: <%= pkg.name %> | Version #: <%= pkg.version %> | Created: <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'public/js/2m2m.min.js': ['public/js/main.js', 'public/js/2m2mcarousel.js']
        }
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);
};