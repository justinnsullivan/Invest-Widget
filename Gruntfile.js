module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation-sites/scss']
      },
      dist: {
        options: {
          sourceMap: true
        },
        files: {
          'public/css/app.css': 'public/scss/app.scss'
        }
      }
    },
    browserSync: {
      default_options: {
        bsFiles: {
          src: [
            "public/js/*.js",
            "public/css/*.css",
            "public/*.html"
          ]
        },
        options: {
          watchTask: true,
          proxy: "http://localhost:3000/"
        }
      }
    },
    watch: {
      grunt: {
        options: {
          reload: true
        },
        files: ['Gruntfile.js']
      },

      sass: {
        files: 'public/scss/**/*.scss',
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['build','browserSync', 'watch']);
}
