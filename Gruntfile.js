module.exports = function(grunt){
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      copy: {
        main: {
          files: [
            {expand: true, cwd: 'client/img' ,src: ['**'], dest: 'build/client/img'},
            {expand: true, cwd: 'client/css',  src: ['**/*.min.css'], dest: 'build/client/css/'},
            {expand: true, cwd: 'client/images',  src: ['**/*'], dest: 'build/client/images/'},
            {expand: true, cwd: 'client/css/theme/fonts',  src: ['**/*'], dest: 'build/client/css/theme/fonts'},
            {expand: true, cwd: 'client/js',  src: ['**/*.html','**/*.min.js'], dest: 'build/client/js/'},
            {expand: true, cwd: 'client/',  src: ['**/*.html','**/*.min.js'], dest: 'build/client/'},
            {expand: true, cwd: 'client/site',  src: ['**'], dest: 'build/client/site/'},
            {expand: true, cwd: 'client/resources', src: ['**/*'], dest: 'build/client/resources/'},
            {src: ['server/**/*'], dest: 'build/'},
            {src: ['server.js','package.json'], dest: 'build/'}
            
          ],
        },
      },
      uglify: {
          options: {
            banner: '/*! <%= pkg.name %> v<%= pkg.version %>  <%= grunt.template.today("yyyy-mm-dd")%>\n <%= pkg.description %>\n by <%= pkg.author %> */\n'
          },
        	all: {
              files: [
                  {expand: true,cwd: 'client/',src: ['**/*.js','!*.min.js'],dest: 'client/',ext: '.min.js'},
                ]
          }
      },
      cssmin: {
        target: {
          files: [{
            expand: true,
            cwd: 'client/css/theme',
            src: ['**/*.css', '!**/*.min.css'],
            dest: 'client/css/theme',
            ext: '.min.css'
          }]
        }
      },
      jshint: {
        files: ['client/js/**/*.js', 'client/test/**/*.js','server/**/*.js','!client/js/**/*.min.js','!client/js/theme/*.js'],
        options: {
          globals: {
            jQuery: true,
            console: true,
            module: true,
            document: true
          }
        }
      },
      clean: ["build/**/*"],
      watch: {
        files: ['Gruntfile.js','client/js/**/*.js','client/**/*.js', '!*.min.js','server.js','server/**/*.js','!node_modules/**/*'],
        tasks: ['clean','jshint','uglify','copy']
      }
  });
  
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  
  grunt.registerTask('build', ['clean','cssmin','jshint', 'uglify','copy']);
  grunt.registerTask('w', ['jshint','uglify','copy']);
  grunt.registerTask('default', ['build','watch']);
};