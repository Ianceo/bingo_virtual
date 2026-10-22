module.exports = function (grunt) {
  grunt.initConfig({
    less: {
      production: {
        options: {
          compress: true,
          banner: '/*! Arquivo gerado pelo Grunt. Edite src/styles/main.less */\n',
        },
        files: {
          'build/styles/main.min.css': 'src/styles/main.less',
        },
      },
    },
    uglify: {
      options: {
        banner: '/*! Arquivo gerado pelo Grunt. Edite src/scripts/main.js */\n',
      },
      target: {
        files: {
          'build/scripts/main.min.js': 'src/scripts/main.js',
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['less', 'uglify']);
};
