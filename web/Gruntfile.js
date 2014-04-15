module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// minimize js files
		uglify: {
			build: {
				src: ['vendor/less/dist/less-1.7.0.min.js', 'js/main.js'], // js input
	    		dest: 'js/build/main.min.js' //js output
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
	      			"css/build/styles.css": "css/import.less"
	    		}
	  		}
		},

		// Watch less styles
		watch: {
			css: {
		    	files: ['css/*.less'],
				tasks: ['less'],
		    	options: {
		      		livereload: true,
		    	},
		  	},
		},

	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Load the pluging that provides less task
	grunt.loadNpmTasks('grunt-contrib-less');

	// Load the pluging that provides watch
	grunt.loadNpmTasks('grunt-contrib-watch');


	// Default task(s).
	grunt.registerTask('default', ['uglify','less','watch']);

};