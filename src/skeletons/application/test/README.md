There are 4 different methods to call on testing
@todo, need to add the No.5 the selenium test

Client Test:

@todo merge the testConfig.js and karma-config.js into one configuration file, the only difference are the relative path and absolute path. so in the individual file, it has to define the module in the config file, so that it could be tested in the multiple different test command.

@todo, Currently, all the module files need to be defined in the configuration file, (both karma and regular config), then include the string representation of that module file. So it could work in both instance.

1. grunt test:client

Run the mocha test in the Command Line, Needs to manually add test file paths into the specs.js, so that the test could be run.

2. grunt test:browser

Run exactly same mocha test like Command Line test but in the browser. Same above to add test files.

3. grunt test:karma

or calling `karma start`  or  `grunt karma`. It will all do the same thing

They both use the karma.conf.js, it should work independently.

Run all test files end with `Test.js` by verifying the file name. It is using the karma-config.js as a configuration.

4. karma start || grunt test:coverage

Currently karma start will only run once, and output the coverage report at the project root.

@todo add the selenium test into the client test area. Write a basic login/logout selenium test.

Server Test

4. grunt test:server

Run the server test in the serverSpecs folder. It currently does not have any configuration.
