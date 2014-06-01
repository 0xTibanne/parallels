module.exports = function(grunt) {
	'use strict';
	grunt.initConfig({

		// imagemin: {
//
			// dynamic: {
				// files: [{
					// expand: true,
					// cwd: 'dist/images/',
					// src: ['*.{png,jpg,gif}'],
					// dest: 'images/min/'
				// }]
			// }
		// }
		// ,
		sass: {
			dist: {                            // Target
				options: {                       // Target options
					style: 'expanded',
					compass: true,
					sourcemap: true,
					require: ['susy'],
					debugInfo: true
				},
				files: {                         // Dictionary of files
					'css/style.css': 'scss/style.scss',
					'css/fa.css': 'vendor/fontawesome/scss/font-awesome.scss'       // 'destination': 'source', 'destination': 'source'
				}
			}
		}
		,

		cssmin: {
			add_banner: {
				options: {
					banner: '/* Parallels Template */'
				},
				files: {
					'css/style.min.css': [
						'css/style.css',
						'css/fa.css',
						'vendor/animate.scss/animate.css'
					]
				}
			}
		},

		watch: {
			css: {
				files: 'scss/*.scss',
				tasks: ['styles'],
				options: {
					livereload: true,
				}
			},
			scripts: {
				files: ['js/*.js'],
				tasks: ['scripts'],
				options: {
					spawn: false
				}
			}
		},

		concat: {
			main: {
				src: [
					'vendor/jquery/dist/jquery.js',
					'vendor/jquery.easing/js/jquery.easing.js',
					'vendor/glidejs/dist/jquery.glide.js',
					'vendor/isotope/dist/isotope.pkgd.js',
					'js/develop.js'
				],
				dest: 'js/app.js'
			}
		},

		uglify: {
			dist: {
				options: {
					baner: 'Parallels Template by Roman Lyadnov | 2014'
				},
				files: {
					'js/app.min.js': ['js/app.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-newer');
	// grunt.loadNpmTasks('grunt-contrib-imagemin');

	grunt.registerTask('styles', ['sass', 'cssmin']);
	grunt.registerTask('scripts', ['concat', 'uglify']);
	grunt.registerTask('default', ['sass', 'cssmin', 'concat', 'uglify', 'watch']);
};