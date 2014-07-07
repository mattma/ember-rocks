'use strict';

var mountFolder = function(connect, dir) {
	return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

	//  TODO: How to exclude jquery and backbone source file
	//  TODO: Template handlebars file updates
	//  TODO: Implement Manifest cache, https://github.com/gunta/grunt-manifest
	//  TODO: Update the Jenkins task   https://github.com/sghill/grunt-jenkins
	//  TODO: Update the 1-click deploy task
	//  TODO: Update the Database - mongoDB, Mongoose. start mongo server
	//  TODO: Look at https://github.com/geddski/grunt-release
	//  TODO: adding the role base support, and validation
	//  TODO: adding the phantomjs support


	// https://github.com/sindresorhus/load-grunt-tasks
	// load all grunt tasks
	require('load-grunt-tasks')(grunt);

	// path & fs is ONLY used in git hook task
	var path = require('path'),
		fs = require('fs'),
            spawn = require('child_process').spawn;

	var output, outputStdout;

	outputStdout = function(data) {
		console.log(data.toString('utf8').trim());
	};

	output = function(proc) {
		proc.stdout.on('data', function(data) {
			return outputStdout(data);
		});
		proc.stderr.on('data', function(data) {
			return outputStdout(data);
		});
	};

	// ducktape to fix the problem
	// https://github.com/gruntjs/grunt-contrib-watch/issues/231
	var WATCH_TASK = 'watch';
	var watchConfig;

	if (process.argv.indexOf(WATCH_TASK) === -1) {
		grunt.util.spawn({
			grunt: true,
			args: [WATCH_TASK]
		});

		watchConfig = {
			sass: {
				files: [
					'<%= CONFIGS.STYLES %>/sass/{modules, ie, framework}/*.sass',
					'<%= CONFIGS.STYLES %>/sass/*.sass'
				],
				tasks: ['sass:single'],
				options: {
					nospawn: true,
					livereload: false
				}
			}
		};
	} else {
		watchConfig = {
			// options: {
			//  spawn: false
			// },
			livereload: {
				options: {
					livereload: true,
				},
				files: [
					'<%= CONFIGS.CLIENT %>/views/{,**/}*.hbs',
					'<%= CONFIGS.APP %>/modules/{,**/}*.js',
					'<%= CONFIGS.APP %>/{,**/}/templates/{,**/}*.hbs',
					'<%= CONFIGS.STYLES %>/{,**/}*.css'
				]
			}
		};
	}

	// Project configuration
	// ---------------------

	grunt.initConfig({

		CONFIGS: {
			CLIENT: 'client',
			APP: '<%= CONFIGS.CLIENT %>/app',
			ASSETS: '<%= CONFIGS.CLIENT %>/assets',
			STYLES: '<%= CONFIGS.CLIENT %>/assets/styles',
			BUILD: 'build',
			HOSTNAME: 'localhost',
			PORT: 3000,

			// Cause selenium jar file is too large, move out of the repo, need to manually copy here
			SELENIUM_DRIVER_PATH: 'test/client/selenium/selenium-server-standalone-2.35.0.jar',
			SELENIUM_MODULE_FOLDER: 'test/client/selenium/modules'
			// SELENIUM_TEST BROWSER Switch between chrome and firefox, default to firefox
			// Config file is located at  test/client/selenium/support/testSupport.js
		},

		pkg: grunt.file.readJSON('package.json'),

		BANNER: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',

		// https://github.com/gruntjs/grunt-contrib-jshint
		// Validate files with JSHint. it is a multi task
		// https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#specifying-jshint-options-and-globals
		jshint: {
			options: {
				jshintrc: '.jshintrc' // '<%= pkg.jshintConfig %>'
				// force: true,  // Report JSHint errors but not fail the task.
			},
			all: [
				'Gruntfile.js'
				// 'client/app/modules/{,**/}*.js',
				// 'spec/**/*.js'
			]
		},

		// https://github.com/onehealth/grunt-open
		open: {
			dev: {
				path: 'http://<%= CONFIGS.HOSTNAME %>:<%= CONFIGS.PORT %>'
			},
			prod: {
				path: 'http://<%= CONFIGS.HOSTNAME %>'
			},
			test: {
				path: '<%= mocha.all.options.urls[0] %>'
			},
			jenkins: {
				path: 'http://hudson-master.adchemy.private:8080/'
			}
		},

		// compile .scss/.sass to .css using Compass
		// https://github.com/gruntjs/grunt-contrib-compass
		//
		// When Switch from :debug to :prod, it won't change the status of the files
		// So it has to run :clean first, then compile either :debug or :prod
		compass: {
			// http://compass-style.org/help/tutorials/configuration-reference/#configuration-properties
			options: {
				sassDir: '<%= CONFIGS.STYLES %>/sass',
				cssDir: '<%= CONFIGS.STYLES %>',
				imagesDir: '<%= CONFIGS.ASSETS %>/images',
				javascriptsDir: '<%= CONFIGS.APP %>',
				fontsDir: '<%= CONFIGS.ASSETS %>/fonts',
				relativeAssets: true
				//config: '<%= CONFIGS.CLIENT %>/config.rb'
			},
			clean: {
				options: {
					clean: true // Remove generated files and the sass cache. # compass clean
				}
			},
			debug: {
				options: {
					debugInfo: true,
					environment: 'development',
					noLineComments: false, //Disable line comments.
					outputStyle: 'expanded'
				}
			},
			prod: {
				options: {
					environment: 'production',
					noLineComments: true,
					outputStyle: 'compressed'
				}
			},
			strip: {
				options: {
					environment: 'production',
					noLineComments: true,
					outputStyle: 'expanded'
				}
			}
		},

		// https://github.com/gruntjs/grunt-contrib-sass
		// adding the sourcemap support to the project
		sass: {
			debug: {
				options: {
					sourcemap: true,
					compass: true,
					debugInfo: false,
					lineNumbers: false, //Disable line comments.
					style: 'expanded',
					quiet: true
				},
				files: [{
					expand: true,
					cwd: '<%= CONFIGS.STYLES %>/sass',
					src: ['{,**/}*.sass'],
					dest: '<%= CONFIGS.STYLES %>',
					ext: '.css'
				}]
			},
			single: {
				options: {
					sourcemap: true,
					compass: true,
					debugInfo: false,
					lineNumbers: false, //Disable line comments.
					style: 'expanded',
					quiet: true,
					force: true
				}
			}
		},

		// Coffee to JS compilation
		// https://github.com/gruntjs/grunt-contrib-coffee
		coffee: {
			options: {
				bare: true
				//join: true,
				//sourceMap: true,
				//separator: Type: String Default: linefeed
			},
			dev: {
				files: [{
					expand: true,
					cwd: '<%= CONFIGS.APP %>/coffee',
					src: [
						'{,**/}*.coffee'
					],
					dest: '<%= CONFIGS.APP %>',
					ext: '.js'
				}]
			},
			test: {
				files: [{
					expand: true,
					cwd: 'test',
					src: [
						'{,**/}*.coffee'
					],
					dest: 'test/spec',
					ext: '.js'
				}]
			}
		},

		// https://github.com/iammerrick/grunt-bower-hooks
		// Automagically wire-up installed Bower components into your RequireJS config
		// Currently is manually edited, Could be dangerous when auto generated
		bower: {
			all: {
				rjsConfig: '<%= CONFIGS.CLIENT %>/config.js'
			}
		},

		// https://github.com/gruntjs/grunt-contrib-copy
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true, // Enable the dot file when copy
					cwd: '<%= CONFIGS.APP %>',
					dest: '<%= CONFIGS.BUILD %>',
					src: [
						'modules/home/*', // copy all the root files
						'modules/home/**/*.{js,hbs}' // copy all sub folder files
						//'.htaccess'           // include the dot file name if needed
					]
				}]
			},

			styles: {
				files: [{
					expand: true,
					cwd: '<%= CONFIGS.STYLES %>',
					dest: '<%= CONFIGS.BUILD %>/<%= CONFIGS.STYLES %>',
					src: [
						'{,*/}*.css',
						'!reset.css',
						'!base.css'
					]
				}]
			},

			requirejs: {
				files: [{
					src: ['<%= CONFIGS.ASSETS %>/vendor/requirejs/require.js'],
					dest: '<%= CONFIGS.BUILD %>/<%= CONFIGS.ASSETS %>/vendor/requirejs/require.js'
				}]
			},

			server: {
				files: [{
					expand: true,
					dot: true,
					cwd: './',
					dest: '<%= CONFIGS.BUILD %>',
					src: [
						'server/**',
						'package.json'
					]
				}]
			}
		},

		// https://github.com/gruntjs/grunt-contrib-clean
		// Clean files and folders. always be cautious of the paths you clean.
		clean: {
			options: {
				// force: true
			},
			build: {
				src: [
					'<%= CONFIGS.BUILD %>'
				]
			},
			// After requirejs build everything into app.js, remove all other folders
			modules: {
				src: [
					'<%= CONFIGS.BUILD %>/<%= CONFIGS.APP %>/modules/*/*/**',
					'<%= CONFIGS.BUILD %>/<%= CONFIGS.APP %>/modules/*/application.js'
				]
			},
			assets: {
				src: [
					'<%= CONFIGS.BUILD %>/<%= CONFIGS.STYLES %>',
					'<%= CONFIGS.BUILD %>/<%= CONFIGS.APP %>/commons',
					'<%= CONFIGS.BUILD %>/<%= CONFIGS.ASSETS %>/vendor'
				]
			},
			prodCleanUp: {
				src: [
					'<%= CONFIGS.BUILD %>/<%= CONFIGS.ASSETS %>/libs',
					'<%= CONFIGS.BUILD %>/<%= CONFIGS.CLIENT %>/config.rb'
					//'<%= CONFIGS.BUILD %>/<%= CONFIGS.CLIENT %>/build.txt'
				]
			},
			node: {
				src: [
					'node_modules/'
				]
			}
		},

		// Uglify task does concat
		// https://github.com/gruntjs/grunt-contrib-concat
		concat: {
			options: {
				//separator: ';' //Concatenated files will be joined on this string.
				//banner:  '<%= BANNER %>'
				//footer: STRING  //Appended to the end of the concatenated output.
				//stripBanners: true  //Strip JavaScript banner comments from source files. /* ... */ block comments are stripped, but NOT /*! ... */ comments.
			},
			build: {
				// src: ['src/intro.js', 'src/project.js', 'src/outro.js'],
				// dest: 'dist/built-<%= pkg.version %>.js'
				// nonull: true  // Warn if a given file is missing or invalid
			}
		},

		// https://github.com/yeoman/grunt-usemin
		// usemin is composed of 2 different tasks (useminPrepare and usemin)
		//
		// useminPrepare: aunched first, detects special construction (blocks) in the HTML files and update the grunt config to run [concat, uglify, cssmin, requirejs] on the files referenced in the block. It does not changes the HTML files it is working on.
		useminPrepare: {
			options: {
				dest: '<%= CONFIGS.BUILD %>/<%= CONFIGS.CLIENT %>'
			},
			hbs: [
				'<%= CONFIGS.CLIENT %>/views/partials/head.hbs'
			]
		},

		// https://github.com/yeoman/grunt-usemin
		// Replaces references to non-optimized js or css into a set of HTML files (or any templates/views)
		//
		// usemin: after run useminPrepare, in the HTML and CSS files it treats, it replaces the blocks by a reference to a single file, as well as all references to images, scripts, CSS files, by their minified/revved/.. version if it is found on the disk. As such this target rewrites the HTML and CSS files it is working on.
		usemin: {
			options: {
				dirs: ['<%= CONFIGS.BUILD %>']
			},
			html: ['<%= CONFIGS.BUILD %>/<%= CONFIGS.CLIENT %>/views/partials/head.hbs']
			//css: [ '<%= CONFIGS.BUILD %>/<%= CONFIGS.STYLES %>/{,*/}*.css'],
		},

		// https://github.com/cbas/grunt-rev
		// Asset revving for Grunt.js
		rev: {
			// all options below are default values
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 8
			},
			build: {
				files: {
					src: [
						'<%= CONFIGS.BUILD %>/<%= CONFIGS.ASSETS %>/vendor/start.min.js',
						'<%= CONFIGS.BUILD %>/<%= CONFIGS.STYLES %>/app.min.css'
						//'<%= CONFIGS.BUILD %>/<%= CONFIGS.ASSETS %>/images/{,**/}*.{png,jpg,jpeg,gif,webp}'
						//'<%= yeoman.dist %>/<%= CONFIGS.STYLES %>/fonts/*'
					]
				}
			}
		},

		// https://github.com/sindresorhus/grunt-svgmin
		// Minify SVG
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= CONFIGS.ASSETS %>/images',
					src: '{,**/}*.svg',
					dest: '<%= CONFIGS.BUILD %>/<%= CONFIGS.ASSETS %>/images'
				}]
			}
		},

		// https://github.com/gruntjs/grunt-contrib-cssmin
		// Compress CSS files.  Files are compressed with clean-css.
		cssmin: {
			options: {
				//banner:  '<%= BANNER %>',
				//keepSpecialComments: STRING, //'*' for keeping all (default), 1 for keeping first one, 0 for removing all.
				report: 'gzip' //false(default), 'min', 'gzip' // report nothing, report only minification result, or report minification and gzip results.
			},
			prod: {
				options: {
					banner: '<%= BANNER %>'
				},
				files: [{
					expand: true,
					cwd: '<%= CONFIGS.STYLES %>/',
					src: [
						'{,**/}*.css'
					],
					dest: '<%= CONFIGS.BUILD %>/<%= CONFIGS.STYLES %>/',
					ext: '.css'
				}],
			},
			appCss: {
				options: {
					banner: '<%= BANNER %>'
				},
				files: [{
					src: ['<%= CONFIGS.BUILD %>/<%= CONFIGS.STYLES %>/app.min.css'],
					dest: '<%= CONFIGS.BUILD %>/<%= CONFIGS.STYLES %>/app.min.css'
				}],
			},
			resetCss: {
				options: {
					banner: '<%= BANNER %>'
				},
				files: [{
					src: ['<%= CONFIGS.STYLES %>/reset.css'],
					dest: '<%= CONFIGS.BUILD %>/<%= CONFIGS.STYLES %>/reset.css'
				}],
			}
		},

		// "grunt-contrib-htmlmin": "*",  NOTE: IT IS NOT IN THE PACKAGE>JSON
		// https://github.com/gruntjs/grunt-contrib-htmlmin
		// Minifies HTML using html-minifier.
		// Since we are using .hbs, we did not use in this webapp
		htmlmin: {
			dist: {
				options: {
					removeComments: true, // Strip HTML comments.
					removeCommentsFromCDATA: true, // Remove HTML comments from inside <script> and <style>
					collapseWhitespace: true, // Collapse white space that contributes to text nodes in a document tree.
					removeEmptyAttributes: true // Remove empty (or blank) attributes.
				},
				files: [{
					expand: true,
					cwd: '<%= CONFIGS.CLIENT %>/views/',
					src: [
						'{,**/}*.html'
					],
					dest: '<%= CONFIGS.BUILD %>/<%= CONFIGS.CLIENT %>/views',
					ext: '.html'
				}]
			}
		},

		// https://github.com/gruntjs/grunt-contrib-imagemin
		// Minify images using OptiPNG and jpegtran.
		imagemin: {
			options: {
				//optimizationLevel: Number // 0 to 7 png only default to 0. 1=1 trail, 2=8 trails, 3=16, 4=24, 5=48, 6=120, 7=240
				//progressive: true // jpg only, default to false  //Lossless conversion to progressive.
			},
			dev: {
				files: [{
					expand: true,
					cwd: '<%= CONFIGS.ASSETS %>/images',
					src: [
						'{,**/}*.{png,jpg,jpeg}'
					],
					dest: '<%= CONFIGS.ASSETS %>/images'
				}]
			},
			prod: {
				files: [{
					expand: true,
					cwd: '<%= CONFIGS.ASSETS %>/images',
					src: [
						'{,**/}*.{png,jpg,jpeg}'
					],
					dest: '<%= CONFIGS.BUILD %>/<%= CONFIGS.ASSETS %>/images'
				}]
			}
		},

		// https://github.com/asciidisco/grunt-requirejs
		// Optimize RequireJS projects using r.js.
		// Can take full list of options from https://github.com/jrburke/r.js/blob/master/build/example.build.js
		requirejs: {
			dist: {
				// Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
				options: {
					baseUrl: '<%= CONFIGS.CLIENT %>',
					dir: '<%= CONFIGS.BUILD %>/<%= CONFIGS.CLIENT %>',
					mainConfigFile: '<%= CONFIGS.CLIENT %>/config.js',

					keepBuildDir: false,

					optimizeCss: 'none',

					pragmasOnSave: {
						//removes Handlebars.Parser code (used to compile template strings) set
						//it to `false` if you need to parse template strings even after build
						excludeHbsParser: true,
						// kills the entire plugin set once it's built.
						excludeHbs: true,
						// removes i18n precompiler, handlebars and json2
						excludeAfterBuild: true
					},

					//List the modules that will be optimized. All their immediate and deep
					//dependencies will be included in the module's file
					modules: [
						//Now set up a build layer for each main layer, but exclude
						//the common one. "exclude" will exclude nested
						//the nested. Any "exclude" that includes built modules should be
						//listed before the build layer that wants to exclude it.
						{
							//module names are relative to baseUrl/paths config
							name: 'app/modules/home/app'
							//exclude: ['jquery']
							//include: ['app/modules/home/application']
						}
					],

					optimize: 'uglify2', // uglify, uglify2, closure, closure.keepLines, none, hybrid

					preserveLicenseComments: false,
					//generateSourceMaps: true,
					useStrict: true

					//uglify2: {} // https://github.com/mishoo/UglifyJS2
					//
					//paths: { // this path is related to the baseUrl setting
					//  principium: '../principium'  // principium is the folder name
					// },
					//include: ['principium'],
					// exclude: ['jquery', 'underscore'],
					// wrap: true
					// wrap: {  // wrap the file at the beginning and end of output file
					//  startFile: ['wrap/wrap.AnyExt'],
					//  endFile: ['wrap/wrap.end']
					// }
				}
			}
		},

		// https://github.com/gruntjs/grunt-contrib-uglify
		// Currently is being used by requirejs task, ONLY manual usage
		uglify: {
			options: {
				banner: '<%= BANNER %>'
				// sourceMap: 'path/to/source-map.js'
			},
			requirejs: {
				files: [{
					src: ['<%= CONFIGS.BUILD %>/<%= CONFIGS.ASSETS %>/vendor/requirejs/require.js'],
					dest: '<%= CONFIGS.BUILD %>/<%= CONFIGS.ASSETS %>/vendor/requirejs/require.js'
				}]
			}
		},

		// https://github.com/kmiyashiro/grunt-mocha
		// mocha for Client Side
		// Running mocha specs inheadless testing through PhantomJS
		mocha: {
			all: {
				options: {
					mocha: {
						ignoreLeaks: true,
						timeout: 90000,
						ui: 'bdd'
					},
					// Indicates whether 'mocha.run()' should be executed in
					// 'bridge.js'. If you include `mocha.run()` in your html spec, you
					// must wrap it in a conditional check to not run if it is opened
					// in PhantomJS, see example/test/test2.html
					run: false,
					reporter: 'Spec',
					urls: ['http://<%= connect.options.hostname %>:<%= connect.options.port %>/index.html']
				}
			}
		},

		//https://github.com/yaymukund/grunt-simple-mocha
		// mocha for Server Side
		// A simple wrapper for running mocha tests.
		simplemocha: {
			options: {
				globals: ['should'],
				timeout: 90000,
				ignoreLeaks: false,
				ui: 'bdd',
				reporter: 'spec'
				//compilers: 'coffee:coffee-script'
			},
			// Server Unit Test
			server: {
				options: {
					compilers: 'coffee:coffee-script'
				},
				src: 'test/server/**/*.coffee'
			},
			// Selenium Test for the single module test. Running the all tests from modules folder
			// E.G. grunt selenium:reporting
			module: {
				src: [
					'<%= CONFIGS.SELENIUM_MODULE_FOLDER %>/<%= moduleName %>/*.js'
				]
			},
			// Selenium Test for the single module file test. Running the one single test from single module folder
			// E.G. grunt selenium:reporting:viewBuilder
			single: {
				src: [
					'<%= CONFIGS.SELENIUM_MODULE_FOLDER %>/<%= moduleName %>/<%= testFileName %>.js'
				]
			},
			// Selenium Test for the whole suite test. Running every single test inside SELENIUM_MODULE_FOLDER.
			// E.G. grunt selenium
			suite: {
				src: [
					'<%= CONFIGS.SELENIUM_MODULE_FOLDER %>/**/*.js'
				]
			}
		},


		// https://github.com/karma-runner/grunt-karma
		// @usage  grunt test:karma  or   grunt karma
		// karma.conf.js should work independently, can be called by `karma start`
		// Setting defined here should override the karma.conf.js setting
		// watch task is for running a development, update on file changes
		// single task is running for a single time, output its coverage report
		karma: {
			options: {
				configFile: 'karma.conf.js',
				browsers: ['Chrome', 'Firefox'],
				reporters: 'dots'
			},
			watch: {
				options: {
					singleRun: false,
					autoWatch: true
				}
			},
			single: {
				options: {
					singleRun: true,
					autoWatch: false
				}
			}
		},

		concurrent: {
			compile: [
				'coffee:dev',
				'sass:debug'
			],
			test: [
				'connect:test',
				'open:test'
			]
		},

		watch: watchConfig,
		// watch: {
		//  compass: {
		//    files: [
		//      '<%= CONFIGS.STYLES %>/sass/{,**/}*.{scss,sass}'
		//    ],
		//    tasks: ['compass:debug', 'livereload']
		//  },
		//  coffee: {
		//    files: [
		//      '<%= CONFIGS.APP %>/coffee/{,**/}*.coffee'
		//    ],
		//    tasks: ['coffee:dev', 'livereload']
		//  },
		//  // coffeeTest: {
		//  //  files: ['test/spec/{,**/}*.coffee'],
		//  //  tasks: ['coffee:test']
		//  // },
		//  livereload: {
		//    files: [
		//      '<%= CONFIGS.CLIENT %>/views/{,**/}*.hbs',
		//      '<%= CONFIGS.APP %>/modules/{,**/}*.js',
		//      '<%= CONFIGS.APP %>/{,**/}/templates/{,**/}*.hbs',
		//      '<%= CONFIGS.STYLES %>/reset.css'

		//      // Currently is being handled by compass & coffee watch tasks
		//      //'<%= CONFIGS.STYLES %>/**/*.css',
		//      //'<%= CONFIGS.APP %>/**/*.js'
		//    ],
		//    tasks: ['livereload']
		//  }
		// },

		connect: {
			options: {
				port: 9000,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			test: {
				options: {
					keepalive: true,

					middleware: function(connect) {
						return [
							mountFolder(connect, 'client'),
							mountFolder(connect, 'test')
						];
					}
				}
			},
			run: {
				options: {
					middleware: function(connect) {
						return [
							mountFolder(connect, 'client'),
							mountFolder(connect, 'test')
						];
					}
				}
			}
		},

		express: {
			options: {
				hostname: '<%= CONFIGS.HOSTNAME %>',
				port: '<%= CONFIGS.PORT %>'
			}
		},

		nodemon: {
			options: {
				hostname: 'localhost',
				port: '<%= CONFIGS.PORT %>'
			},
			prod: {
				options: {
					file: './server/index.js',
					ignoredFiles: ['README.md', 'node_modules/**'],
					watchedExtensions: ['js', 'coffee'],
					watchedFolders: ['./server'],
					debug: false,
					gruntEnabled: true
				}
			}
		},

		stripContent: {
			devDependencies: {
				options: {
					name: 'package.json devDependencies block removal',
					regExp: /"devDependencies"[\S\s]+?},/,
					replaceWith: '' //default: ''
				},
				files: [{
					expand: true,
					cwd: '<%= CONFIGS.BUILD %>',
					src: [
						'package.json'
					],
					dest: '<%= CONFIGS.BUILD %>',
					ext: '.html'
				}]
			}
		},

		// Currently link task is dedicated to create Git Hooks Scripts
		// options.guard # decide which file is being created
		// details usage is defined in ext/git_hooks/README.md
		link: {
			options: {
				path: '.git/hooks/'
			},
			// pick task is based on guard options
			// only symlink the file which defined in guard option
			pick: {
				options: {
					remove: false,
					guard: [
						'pre-commit'
					]
				},
				src: [
					'ext/git_hooks/*.js'
				]
			},
			// Add all existing hook.
			// by default, it will use default options.all hook name,
			// user can override this behavior by defined specific all guard to override the default
			all: {
				options: {
					remove: false,
					guard: ['applypatch-msg', 'commit-msg', 'update',
						'post-commit', 'post-receive', 'post-update',
						'pre-applypatch', 'pre-commit', 'pre-rebase', 'prepare-commit-msg'
					]
				},
				src: [
					'ext/git_hooks/*.js'
				]
			},
			remove: {
				options: {
					remove: true,
					guard: [
						'pre-commit'
					]
				},
				src: [
					'ext/git_hooks/*.js'
				]
			},
			removeAll: {
				options: {
					remove: true,
					guard: ['applypatch-msg', 'commit-msg', 'update',
						'post-commit', 'post-receive', 'post-update',
						'pre-applypatch', 'pre-commit', 'pre-rebase', 'prepare-commit-msg'
					]
				},
				src: [
					'ext/git_hooks/*.js'
				]
			}
		}
	});

	grunt.event.on('watch', function(action, filepath, target) {
		if (path.extname(filepath) === '.sass') {

			//grunt.log.writeln(target + ': ' + filepath + ' has ' + action);

			var dirnameArray = path.dirname(filepath).split('/'),
				moduleName = dirnameArray[dirnameArray.length - 1],
				baseName = path.basename(filepath, '.sass'),
				newModuleName = (moduleName === 'sass') ? '' : moduleName,
				outputPath = (path.join('client/assets/styles/', newModuleName, baseName)) + '.css';

			grunt.config('sass.single.files', [{
				'src': filepath,
				'dest': outputPath
			}]);
		}
	});

	//grunt.renameTask('regarde', 'watch');

	grunt.registerTask('express', 'Start a express web server.', function() {
		//options values will be overrided by options obj in Gruntfile.js
		var options = this.options({
			hostname: 'localhost',
			port: 3000
		});

		require('./server/app')(options);
	});

	// Based on: https://github.com/ChrisWren/grunt-nodemon
	// Other Useful: https://npmjs.org/package/grunt-exec
	// Other Useful: https://github.com/bustardcelly/grunt-forever
	grunt.registerMultiTask('nodemon', 'Starts a nodemon server in development environment.', function() {

		var command = [];
		var options = this.options();
		grunt.verbose.writeflags(options, 'Options');

		//var done = this.async();

		if (options.ignoredFiles) {
			var fileContent = '# Generated by Grunt\n';
			options.ignoredFiles.forEach(function(ignoredGlob) {
				fileContent += ignoredGlob + '\n';
			});
			grunt.file.write('.nodemonignore', fileContent);
		}

		if (options.watchedFolders) {
			options.watchedFolders.forEach(function(folder) {
				command.push('--watch');
				command.push(folder);
			});
		}

		if (options.watchedExtensions) {
			command.push('-e');
			var extensionList = '';
			options.watchedExtensions.forEach(function(extensions) {
				extensionList += extensions + ',';
			});
			command.push(extensionList.slice(0, -1));
		}

		if (options.file) {
			command.push(options.file);
		}

		if (options.hostname) {
			command.push(options.hostname);
		}

		if (options.port) {
			command.push(options.port);
		}

		if (options.gruntEnabled) {
			command.push(options.gruntEnabled);
		}

		if (options.debug) {
			command.push('--debug');
		}

		if (options.args) {
			options.args.forEach(function(arg) {
				command.push(arg);
			});
		}

		grunt.util.spawn({
			cmd: 'nodemon',
			args: command,
			opts: {
				stdio: 'inherit'
			}
		}, function(error, result) {
			if (error) {
				grunt.fail.fatal(result.stdout);
			}
			grunt.log.writeln(result.stdout);
		});
	});


	grunt.registerMultiTask('link', 'create a symlink between two files', function() {
		var options = this.options();
		grunt.verbose.writeflags(options, 'Options');

		this.filesSrc.forEach(function(file) {

			// hookFIle: return the file path from the ext/git_hooks
			var hookFile = path.resolve(__dirname, file),
				// only return the name part of the hook without extension
				hookName = path.basename(hookFile, '.js');

			options.guard.forEach(function(hook) {
				// hook name is only valid when they match the name in the array
				if (hook === hookName) {
					// where the .git/hook folder is
					var hookInHiddenDirectory = path.resolve(__dirname, options.path, hook);
					// If hook is already there, simply unlink it
					if (fs.existsSync(hookInHiddenDirectory)) {
						fs.unlinkSync(hookInHiddenDirectory);
					}
					if (options.remove) {
						// when remove or removeAll tasks are called.
						grunt.log.writeln('.git/hooks/' + hookName + ' is removed!');
					} else {
						// by default, simply add new or override existing symlink
						// add the latest hook code into the .git/hook/ folder
						fs.linkSync(hookFile, hookInHiddenDirectory);
						// make sure the new hook file is executeable! Otherwise, it won't register git hook
						spawn('chmod', ['0775', hookInHiddenDirectory]);
						grunt.log.writeln('.git/hooks/' + hookName + ' is created!');
					}
				}
			});
		});
	});

	// By default, call link will execute link:all task.
	// which will link all defined git hooks in ext/git_hooks folders
	//grunt.registerTask('link',  [ 'link:all' ]);


	// Custom Function to manually strip out any regular RegExp
	// Options { name: '', regExp: //, replaceWith: String }  but all three are required.
	// name  # name of the task will show up in the logs
	// regExp  # RegExp match syntax for filtering the content
	grunt.registerMultiTask('stripContent', 'Strip out the LiveReload Script tag in HTML', function() {
		var options = this.options();
		grunt.verbose.writeflags(options, 'Options');

		if (!options.name) {
			grunt.log.warn('options.name is required');
			return false;
		}
		if (!options.regExp) {
			grunt.log.warn('options.regExp is required');
			return false;
		}

		var replaceWith = options.replaceWith || '';

		this.files.forEach(function(file) {

			file.src.filter(function(filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					var content = grunt.file.read(filepath);

					if (content.match(options.regExp)) {
						content = content.replace(options.regExp, replaceWith);
						grunt.file.write(filepath, content);
						grunt.log.writeln('Strip out the %s from %s', options.name, filepath);
					}
				}
			});
		});
	});


	// // Compass Clean, Reset css in Development Environment
	// grunt.registerTask('sass:debug', function() {

	//  grunt.task.run([
	//    'compass:clean', // remove the .sass & .sass-cache/
	//    'compass:debug'
	//  ]);
	// });

	// grunt.registerTask('sass:strip', function() {

	//  grunt.task.run([
	//    'compass:clean', // remove the .sass & .sass-cache/
	//    'compass:strip'
	//  ]);
	// });

	// grunt.registerTask('sass', ['sass:debug']);

	// Running Development Environment without Server Reload
	grunt.registerTask('server:client', function() {

		grunt.task.run([
			'coffee:dev',
			'sass:debug',
			'express',
			'open:dev',
			'watch'
		]);
	});

	// Running Development Environment with Server Reload
	grunt.registerTask('server:node', function() {

		grunt.task.run([
			'nodemon',
			'concurrent:compile',
			'open:dev',
			'watch'
		]);
	});

	grunt.registerTask('server', ['server:client']);

	// Running Production Environment
	grunt.registerTask('build', function() {

		grunt.task.run([
			'clean:build', // remove build/ folder
			//'coffee:dev',
			'compass:clean', // remove the .sass & .sass-cache/
			'compass:prod', // minify css, remove line number, debug info
			'useminPrepare',
			'requirejs',
			'clean:modules', // Clean up modules folder, leave only app.js & application.js
			'clean:assets', // Clean up build styles folder, and vendor folder
			'copy:styles', // Copy compressed styles folder into the build/
			'concat', // concat reset.css & base.css into app.min.css | concat js
			'cssmin:appCss', // Minify app.min.css only
			'copy:requirejs', // copy require.js file from dev environment to prod
			'uglify', // minify require.js & start.min.js in build/vendor
			'imagemin:prod',
			'copy:server', // Copy server/ & required files to build/
			'clean:prodCleanUp', // remove assets/libs/, client/build.txt, client/config.rb
			'rev',
			'stripContent:devDependencies', // Strip out 'devDependencies' block from build/package.json folder
			'usemin'
		]);
	});


	// When running in the browers, run task
	// grunt connect:test
	// for starting the static server, then open in browers
	// http://localhost:9000  //by default, it will open   index.html
	grunt.registerTask('test:client', [
		'connect:run',
		'mocha'
	]);

	grunt.registerTask('test:browser', [
		'concurrent:test'
	]);

	grunt.registerTask('test:server', [
		'simplemocha:server'
	]);

	grunt.registerTask('test:karma', [
		'karma:watch'
	]);

	grunt.registerTask('test:coverage', 'run karma start command to generate the coverage', function() {
		var done = this.async();
		return output(spawn('karma', ['start']), done);
	});

	grunt.registerTask('test', ['test:client']);


	// Selenium Tasks
	// ---------------------------------
	//
	// @description Register & Running the whole selenium suite
	grunt.registerTask('selenium', 'Running selenium test for the whole test suite', function() {
		grunt.task.run([
			'simplemocha:suite'
		]);
	});

	// @description Kick start the selenium web server
	// @usage grunt selenium:server
	grunt.registerTask('selenium:server', 'Start a selenium web server.', function() {

		var done = this.async(),
			SELENIUM_DRIVER_PATH = grunt.config.get('CONFIGS').SELENIUM_DRIVER_PATH;

		return output(spawn('java', ['-jar', SELENIUM_DRIVER_PATH]), done);
	});

	/**
	 * @private
	 * @method setupSeleniumVariables
	 * @description Dynanicially register the task name, and its file array or file
	 *
	 * @setter
	 * @param  {String} moduleName      selenium module folder name, auto generated
	 * @param  {String} [filename]       selenium filename inside module folder, auto generated
	 */
	function setupSeleniumVariables(moduleName, filename) {

		// Another way to access the task arguments
		//console.log('grunt.task.current: ', grunt.task.current.args);

		grunt.config.set('moduleName', moduleName);

		// it will be evaluated when 'simplemocha:single' is being run
		if (filename) {
			var testFileName = (filename.indexOf('Test') > -1) ? filename : filename + 'Test';
			grunt.config.set('testFileName', testFileName);
		}
	}

	// @description Auto register each module by detecting the module folder name
	// then auto register its name as the task name to be run
	// it won't require any manual work, handled automatically
	function autoRegisterSeleniumModulesTask() {
		var SELENIUM_MODULE_FOLDER = grunt.config.get('CONFIGS').SELENIUM_MODULE_FOLDER,
			modulesDir = grunt.file.expand({
				cwd: SELENIUM_MODULE_FOLDER,
				nonull: true
			}, '*');

		modulesDir.forEach(function(module) {
			if (grunt.file.isDir(SELENIUM_MODULE_FOLDER + '/' + module)) {
				grunt.registerTask('selenium:' + module, 'Running single module test or single module single file test', function(filename) {
					setupSeleniumVariables(module, filename);
					if (filename) {
						grunt.task.run([
							'simplemocha:single'
						]);
					} else {
						grunt.task.run([
							'simplemocha:module'
						]);
					}
				});
			} else {
				grunt.log.warn(module + ' is not a directory. It cannot register a task.');
			}
		});
	}

	// @description init the registering all the selenium tasks
	autoRegisterSeleniumModulesTask();

	// http://tech.gilt.com/post/57089759513/rock-your-doc-with-groc-our-favorite-automated
	// https://github.com/gilt/groc
	//
	/**
	 * Sets a cookie given a value of any type.
	 *
	 * @method    set
	 * @public
	 *
	 * @param     {String}   name               The name of the cookie to be set
	 * @param     {Mixed}    value              The value to convert to string and set in the cookie
	 * @param     {Object}   [options]          Options hash
	 * @param     {Mixed}    [options.expires]  The expiration as a number of seconds, or "session", or undefined for one year
	 *
	 * @return    {Boolean}                     Whether or not the cookie was successfully set
	 *
	 * @example
	 *   cookie.set('foo', 'bar', { expires : 1000000 });
	 *   cookie.set('foo', [1, 2, 3], { expires : 'session' });
	 *   cookie.set('foo', { bar : 'baz', boom : 'boosh' });
	 */
	//
	grunt.registerTask('doc', 'Generate documentation', function() {
		// done fn is required to exexute it until all files have been resolved.
		var done = this.async();
		grunt.log.writeln('Generating Documentation...');

		output(spawn('./node_modules/groc/bin/groc', [
			'./client/src/js/modules/**/*.{js,hbs}'
			// './client/src/static/styles/sass/**/*.sass'  // currently do not support sass
		]), done);
	});

	// grunt.registerMultiTask('log', 'Log stuff.', function() {
	//  grunt.log.writeln(this.target + ': ' + this.data);
	// });

	grunt.registerTask('default', ['server']);
};
