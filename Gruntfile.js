module.exports = function (grunt) {
  grunt.initConfig({
    clean: {
      dist: ['build/assets/*', 'include/*', '*.html']
    },
    copy:{
      svg:{
        files:[
          {expand: true, flatten: true, src: ['src/svg/**'], dest: 'build/assets/svg/', filter: 'isFile'}
        ]
      }
    },
    postcss: {
      options: {
        map: {
          inline: false,
          annotation: 'build/assets/map/'
        },
        processors: [
          require('postcss-nested'),
          require('postcss-simple-vars'),
          require('pixrem')(),
          require('autoprefixer')({browsers: 'last 3 versions'}),
          require('cssnano')()
        ]
      },
      dist: {
        src: ['build/assets/css/style.raw.css'],
        dest: 'build/assets/css/style.css'
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
          dest:'./build/',
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
          cwd: './build/',
          src: '*.html',
          dest: "./build/"
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
        dest: 'build/assets/js/pack.js'
      },
      css:{
        src:['src/css/*.pcss'],
        dest:'build/assets/css/style.raw.css'
      }
    },
    uglify: {
      my_target: {
        files: {
          'build/assets/js/pack.min.js': ['build/assets/js/pack.js']
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/img',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'build/assets/img/'
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