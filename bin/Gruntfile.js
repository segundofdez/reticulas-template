module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// minimize js files
		uglify: {
	  		development: {
				src: ['../web/vendor/less/dist/less-1.7.0.min.js','../web/vendor/jQuery/dist/jquery.min.js', '../web/js/main.js'], // js input
	    		dest: '../web/js/build/main.min.js', //js output

		  		options: {
			        beautify: {
			         	width: 80,
			        	beautify: true
			        }
			    }
	  		},
			production: {
				src: ['../web/vendor/less/dist/less-1.7.0.min.js','../web/vendor/jQuery/dist/jquery.min.js', '../web/js/main.js'], // js input
	    		dest: '../web/js/build/main.min.js' //js output,
	  		}
		},

		// less to css
		less: {
	  		development: {
	    		options: {
	    			paths: ["css"],
	    		},
	    		files: {
	      			"../web/css/build/styles.css": "../web/css/import.less"
	    		}
	  		},
			production: {
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
					src: ['**/*.{png,jpg,gif}', '!build/**'],
					dest: '../web/media/img/build/'
				}]
			}
		},

		// Html min
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'../web/index.min.html': '../web/index.html'
				}
			}
		},

		// Watch less and js
		watch: {
			html:{
				files: ['../web/*.html']
			},
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

	// Load the plugin that provides the uglify task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Load the pluging that provides less task
	grunt.loadNpmTasks('grunt-contrib-less');

	// Load the plugin thah provides image min task
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	// Load the plugin thah provides html min task
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	// Load the pluging that provides watch task
	grunt.loadNpmTasks('grunt-contrib-watch');


	// Development task(s).
	grunt.registerTask('dev', ['uglify:development','less:development', 'watch']);

	// Final production task(s).
	grunt.registerTask('prod', ['uglify:production','less:production','imagemin', 'htmlmin', 'watch']);

};