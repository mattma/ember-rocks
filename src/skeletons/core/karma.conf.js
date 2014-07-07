// Karma configuration
// Generated on Tue Aug 20 2013 11:45:52 GMT-0700 (PDT)

module.exports = function(config) {
	config.set({

		// base path, that will be used to resolve files and exclude
		basePath: '',


		// frameworks to use
		frameworks: ['mocha', 'requirejs'],


		// list of files / patterns to load in the browser
		files: [
			'test/karma-config.js',

			{pattern: 'test/*.js', included: false},
			{pattern: 'test/specs/*.js', included: false},
			{pattern: 'test/libs/**/*.js', included: false},
			{pattern: 'client/app/modules/**/*.js', included: false},
			{pattern: 'client/assets/vendor/**/*.js', included: false }
		],

		// list of files to output the coverage by istanbul
		preprocessors: {
			// source files, that you wanna generate coverage for
			// do not include tests or libraries
			// (these files will be instrumented by Istanbul)
			'test/specs/*.js': 'coverage'
		},

		// list of files to exclude
		exclude: [

		],


		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['progress', 'coverage'],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['Firefox'],


		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,


		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: true,

		// optionally, configure the reporter
		// - html (default)
		// - lcov (lcov and html)
		// - lcovonly
		// - text
		// - text-summary
		// - cobertura (xml format supported by Jenkins)
		//
		// If you set type to text or text-summary, you may set the file option, like this.
		// file : 'coverage.txt'
		coverageReporter: {
			type : 'html',
			dir : 'coverage/'
		},

		plugins: [
			'karma-mocha',
			'karma-requirejs',
			'karma-coverage',
			'karma-chrome-launcher',
			'karma-firefox-launcher'
		]
	});
};
