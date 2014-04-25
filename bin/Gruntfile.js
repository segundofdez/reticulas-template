module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// minimize js files
		uglify: {
			build: {
				src: ['../web/vendor/less/dist/less-1.7.0.min.js', '../web/js/main.js'], // js input
	    		dest: '../web/js/build/main.min.js' //js output
	  		}
		},

		// less to css
		less: {
			development: {
	    		options: {
	    			paths: ["css"],
	      			compress: true,
	    		},
	    		files: {
	      			"../web/css/build/styles.css": "../web/css/import.less"
	    		}
	  		}
		},

		// Image min
		imagemin: {
			static: {
				options: {
					optimizationLevel: 6
				},
				files: [{
					  expand: true,
					  cwd: '../web/media/img/',
					  src: ['**/*.{png,jpg,gif}'],
					  dest: '../web/media/img/build/'
				}]
			}
		},

		// Watch less and js
		watch: {
			css: {
		    	files: ['../web/css/*.less'],
				tasks: ['less'],
		    	options: {
		      		livereload: true,
		    	},
		  	},
		  	another: {
				files: ['../web/js/main.js'],
				tasks: ['uglify'],
		    },
		},

	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Load the pluging that provides less task
	grunt.loadNpmTasks('grunt-contrib-less');

	// Load the plugin thah provides image min
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	// Load the pluging that provides watch
	grunt.loadNpmTasks('grunt-contrib-watch');


	// Default task(s).
	grunt.registerTask('default', ['uglify','less','imagemin','watch']);

};