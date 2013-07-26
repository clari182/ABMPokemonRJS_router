module.exports = function(grunt) {
  // este método que nos da Grunt es para pasarle las configuraciones a los paquetes que usemos
  grunt.initConfig({
    concat: {
      all: {
        src: "./scripts/**/*.js",
        dest: "./build/pokemons.js"
      }
		},
    uglify: {
      all: {
        src: "./build/pokemons.js",
        dest: './build/pokemons.min.js'
      }
		},
		qunit:{
			target: {
				src: ['test/**/*.html']
			}
		}
  });
 
  // registramos las tareas (plugins) desde npm en Grunt
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
 
  // registramos las tareas que se pueden ejecutar y el orden
  grunt.registerTask("default", [ "concat", "uglify" ]);
  grunt.registerTask("dist", [ "default" ]);
};