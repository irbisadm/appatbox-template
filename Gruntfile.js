module.exports = function (grunt) {
  grunt.initConfig({
    clean: {
      dist: ['assets/*', 'include/*', '*.html']
    },
    copy:{
      svg:{
        files:[
          {expand: true, flatten: true, src: ['src/svg/**'], dest: 'assets/svg/', filter: 'isFile'}
        ]
      }
    },
    postcss: {
      options: {
        map: {
          inline: false,
          annotation: 'assets/map/'
        },
        processors: [
          require('postcss-nested'),
          require('pixrem')(),
          require('autoprefixer')({browsers: 'last 3 versions'}),
          require('cssnano')()
        ]
      },
      dist: {
        src: ['assets/css/style.raw.css'],
        dest: 'assets/css/style.css'
      }
    },
    pug: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: './src/pug/',
          src: "**/*.pug",
          ext: '.html'
        }]
      }
    },
    htmlmin: {
      prod: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: './',
          src: '*.html',
          dest: "./"
        }]
      }
    },
    watch: {
      pug: {
        files: ['src/pug/*.pug', 'src/pug/pages/*.pug','src/pug/templates/*.pug', 'src/pug/mail/*.pug'],
        tasks: ['pug'],
        options: {
          spawn: false
        }
      },
      postcss: {
        files: ['src/css/*.pcss'],
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
      imgsvg: {
        files: ['src/svg/*.svg'],
        tasks: ['copy:svg'],
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
        src:['src/css/*.pcss'],
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
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('build', ['newer:imagemin', 'pug','copy', 'concat', 'postcss', 'uglify']);
  grunt.registerTask('rebuild', ['clean', 'build']);
  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('publish', ['build', 'htmlmin']);
};