module.exports = function (grunt) {
  grunt.initConfig({
    postcss: {
      options: {
        map: {
          inline: false,
          annotation: 'assets/map/'
        },
        processors: [
          require('pixrem')(),
          require('autoprefixer-core')({browsers: 'last 3 versions'}),
          require('cssnano')()
        ]
      },
      dist: {
        src: ['assets/css/style.raw.css'],
        dest: 'assets/css/style.css'
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: './src/jade',
          src: "./*.jade",
          ext: '.html'
        }]
      }
    },
    watch: {
      jade: {
        files: ['src/jade/*.jade', 'src/jade/include/*.jade'],
        tasks: ['jade'],
        options: {
          spawn: false
        }
      },
      postcss: {
        files: ['src/css/*.css'],
        tasks: ['concat','postcss'],
        options: {
          spawn: false
        }
      },
      img: {
        files: ['src/img/*.png', 'src/img/*.jpg', 'src/img/*.gif'],
        tasks: ['newer:imagemin'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['concat','uglify'],
        options: {
          spawn: false
        }
      }
    },
    concat: {
      js: {
        src: ['src/js/*.js'],
        dest: 'assets/js/pack.js'
      },
      css:{
        src:['src/css/*.css'],
        dest:'assets/css/style.raw.css'
      }
    },
    uglify: {
      my_target: {
        files: {
          'assets/js/pack.min.js': ['assets/js/pack.js']
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/img',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'assets/img/'
        }]
      }
    }
  });
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('default', ['newer:imagemin', 'jade', 'concat','postcss', 'uglify', 'watch']);
}