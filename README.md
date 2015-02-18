# Ember Rocks ( a.k.a em-cli ) 

[![NPM][npm-badge-image]][npm-badge-url] [![NPM download](http://img.shields.io/npm/dm/ember-rocks.svg?style=flat)](https://www.npmjs.org/package/ember-rocks)

[![NPM version][npm-image]][npm-url]   [![Build Status][travis-image]][travis-url]   [![Dependency Status][dependency-image]][dependency-url]


> An Em(ber) command line utility to help developer(s) build an ambitious web application. It is highly inspired by some awesome open source projects, [ember-cli](https://github.com/stefanpenner/ember-cli), [ember-tools](https://github.com/rpflorence/ember-tools), [Web Starter Kit](https://github.com/google/web-starter-kit), [Gulp](https://github.com/gulpjs/gulp/).


## Getting Started

```bash
    npm install -g ember-rocks
```

After the installation, you should have a global command `em` available. 
Try `em --help`, you should see a list of helper information. 
Try `em generate --help` to see a specific command helper information.


## Features

- well align with Ember-Cli project
- gulp ( build tool of choice ) build insanely fast via node stream api
- lighting fast development rebuild system
- live reload on all resources
- super powerful generator system
- Sass language support with CSS sourcemap, trace back to original Sass defination
- ES6 ( Next Version of javascript ) with JS sourcemap, trace back to origional ES6 defination
- hackable express server as back end
- Mocha testing framework and BDD should.js style supported by default
- simple command to build a production ready application and ready to be deployed
- tablet and touch device support out of box. Responsive Web Design supported.
- hybird web app on native phone and tablet via Cordova package. For iOS, Andriod, Blackberry, and more

## A sample ember app in the Ember Rocks

**Ember Rocks** comes with a sample application, and user could even have their own set of templates. See [Ember Rocks Template Basic](https://github.com/mattma/Ember-Rocks-Template-Basic) for details.

An express (Node.js) server will handle all requests. A fake user api route will read the RESTful json api on the disk, return the data over the wire when Ember app request the data via latest **Ember Data** library. In real world application, it should be replaced with MongoDB (recommended), CouchDB, etc. It is very easy to integrate with any NoSQL database.  

The fully stylish application works on touch and tablet devices out of box. Try to resize your browser into a smaller screen resolution, you should see an animated effect from the left edge which is the most popular choice of mobile application navigation menu. You could tweak the styles and markup to fit your use cases. 


## Ember-cli is the official **Ember** app CLI tool (Ember#2.0 and forward). Why am I building another em(ber)-cli?

**Ember-Cli** is awesome and it is supported by [Ember core team](https://github.com/emberjs/rfcs/pull/15). If **Ember-Cli** is working for you, stick with it; otherwise, you can try **Ember-Rocks** and continue reading below,

`TL;DR`

There are a few reasons why I started with this project:

1. There was no official build tool for Ember project when I started in the middle of 2014. But now, Ember core team has announced that [**Ember-cli**](https://github.com/emberjs/rfcs/pull/15) is the official build tool to move forward. 

2. **Ember-cli** has chosen [broccoli](https://github.com/broccolijs/broccoli) as its build tool. Do not get me wrong, **Broccoli** is an awesome build tool. I have even chatted with its creator, [Jo Liss](https://github.com/joliss). She is an awesome engineer. But to me, after I switched from **Grunt** to **Gulp** at the end of 2013, I have learned in and out about **Gulp** and its EcoSystem. I do not want to follow the same path again from **Gulp** to **Broccoli**. Essentially, they are the same thing with different approach but solving the same set of problems. 

3. **Ember-cli** has chosen [Qunit](https://github.com/jquery/qunit) as its testing tool. I was never a fan of TDD and Qunit. BDD and Mocha framework are always there to cheer me up. This is almost No-Brainer question for me since there is no addon for using Mocha testing framework. But now, [Ember-Mocha](https://github.com/switchfly/ember-mocha/) has released to change the game. In fact, **Ember-Mocha** also powers **Ember-Rocks** testing use cases.

4. **Ember-cli** project is trying to be an universal toolset to fit most of use cases for majority of **Ember** developers. It is truly amazing to see Ember core team is there for wide range of audience. But I have a set of tools that works well. I will stick with it and also want to have full control over it if I could. Note: If **Ember-cli** works for you, great, you should stick with it since it supports by Ember core team. 

5. **Ember-cli** has hided lots of complex system scripts and build logics into CLI core. For example, express server is built in so that it is hard to roll in any homebrew middlewares. Exposing Express server is becoming a necessary problem that need to be addressed.  

Those are the major reasons why I started **Ember-Rocks** project. I have built several build systems throughout my professional career and some plugins/libraries for developers. In details below,

After built a large Backbone application (>15000 LOC), I developed a set of developer toolings which fit my customized workflow very well. **Ember Rocks** approach is my opinionated toolset on building a large scaled Node.js modern web application with Ember.js framework on the client side.

**Ember Rocks** can be globally installed on your local machine ( tested on Linux based operating system ) via `npm install -g ember-rocks`. After you have done that, magic happens :). You would have an `em` command available. Try `em --help`, `em generate --help` for a comprehensive guide. 

**Ember Rocks** is chosen [gulp](https://github.com/gulpjs/gulp) as a build tool. In fact, it is powered by [gulp](https://github.com/gulpjs/gulp) under the hook. **Ember-cli** choose [broccoli](https://github.com/broccolijs/broccoli). The main difference between two awesome build tools is, *broccoli* use "directory in, directory out" pattern, and *gulp* use "file in, file out" pattern. *gulp* takes advantage of *Node Stream* to pipe files to destination folder. This is the one I perfer for now until [broccoli](https://github.com/broccolijs/broccoli) is out of beta. Sorry, [Jo Liss](https://twitter.com/jo_liss), you are awesome.

In addition, technology stack besides Ember.js, I have picked [sass](http://sass-lang.com/) as css pre-compiler, [autoprefixer](https://github.com/ai/autoprefixer) as css post-compiler, [express](http://expressjs.com/) as node web application server, and [mocha](http://visionmedia.github.io/mocha/) as javascript testing framework. [6to5](https://github.com/6to5/6to5) used to turn ES6+ code into readable vanilla ES5.

Just like [lodash](lodash.com) is a project which solve the same problem that [underscore](http://underscorejs.com/) does, [Ember Rocks](https://github.com/mattma/ember-rocks) is trying to solve similar problem that [ember-cli](https://github.com/stefanpenner/ember-cli) does. I will try to sync the features from [ember-cli](https://github.com/stefanpenner/ember-cli) to [Ember Rocks](https://github.com/mattma/ember-rocks). 

What is on my road map? Ember Add-ons, custom components, frequent updates along with Ember releases and more. PRs, Issues, Suggestion are highly welcomed and appreciated. 


## Quick Start

```bash
    em new my-app          # generate a brand new ember app in *my-app* folder
    cd my-app              # switch to application folder
    em serve               # start a server, open the new app in browser, livereload all resources
```

## Usage

```bash
    em [command] [options]

    Commands:

        new [options]      # Creates a new ember application at [dirName]
           
        g|generate         # Generate a new file with ES6 support in the ember app
               
        s|serve            # Builds and serves your app, rebuilding on file changes

        m|mobile           # Builds an Cordova application, and ready to deploy to phone or tablet
           
        b|build            # Release your app and places it into the output path '~/build'

        t|test            # Run client side integration and unit tests, rerun tests on file changes
       
    Options:

        -h, --help     output usage information
        -V, --version  output the version number

    Command-Specific Help:

        em [command] --help
```

## Guide

Since the project is highly inspired by [Ember-Cli](http://www.ember-cli.com/), ( both projects even share the same commands but completely different implementation under the hook, i.e. `em(ber) new`, `em(ber) generate`, `em(ber) g`, `em(ber) serve`, `em(ber) build`, `em(ber) test`, etc ), **Ember Rocks** uses the same modules -- [ember resolver](https://github.com/stefanpenner/ember-jj-abrams-resolver), and [ember load initializers](https://github.com/stefanpenner/ember-load-initializers). Ember Modules system ( *client/app/* ) and the resolver guide will apply to **Ember Rocks** modules and the resolver as well.

* Modules and the Resolver [Documentation](http://www.ember-cli.com/#using-modules)

_( More Coming Soon )_


## Testing your app

**Ember-Rocks** testing story is 100% based on [Ember Testing Guide](http://emberjs.com/guides/testing/) so that **Guide's methods, properties** would apply to your testing story just like **Ember** default testing framework - QUnit. With a couple of variations, first, it uses [Mocha testing framework](http://mochajs.org/) with the assetion library [should.js](https://github.com/shouldjs/should.js) in BDD style; Second, you could optionally use ES6 syntax inside your tests and it would be transpiled into vanilla javascript in the development phase. 

Integration tests are located in the folder `client/tests/integration`, and Unit tests are located in the folder `client/test/unit`. You do not have to manually create any new test files since you could simplly use `em generate` to generate any new tests with pre-defined boilerplate. If you do not know how, use `em g --help` for more details. 

If you have to manually create a test file, name test file anything you want, suffix `-test` or `_test` with file extension `.js`.

You could use future **ES6** syntax in tests, and they would be pre-compiled into vanilla javascript before serving in the browsers or phantomjs headless browsers.

#### Easiest way, the recommended way to run your test

By simply running `em test` or `em t`, it would compile your testing files, build the project, launch an express server to take any requests, watch any test file changes and rerun the test again, show the result of the tests.

```bash
  em test
```

#### Easy way, but requires two different processes and `testem` installed globally in your system. ( `npm install testem -g` )

By executing `testem` command, you get pretty UI in terminal to see exactly what is going on with your tests. `testem` should automatically launch **chrome** and **phantomjs** to run all of your tests.

Note: After `em test` run, the current processer continues running and watching any existing test files change, and it will rebuild the whole test suite and rerun all the tests. 

GotCha: Any new/delete file won't rerun the tests or add to the current test run loop. You need to stop the current processer and rerun the command `em test` to pick up the new/delete testing files.

```bash
  # process 1
  em test
  
  # process 2
  cd path/to/root...
  cd build
  testem
```

## Building a web app (desktop and browsers)

```bash
  em build
  cd build
  npm install
  npm start
  # Visit your production ready app at http://localhost:3001
```

## Building a native app (phone and tablet)

```bash
  em mobile
  cd build
  npm install
  cd build/cordova  # if in `build` folder, just `cd cordova`. Note: need to be in `cordova` folder to execute `cordova` command
  cordova platform add ios # require **cordova** executable or `npm install -g cordova`
  cordova run --emulator # open the native app in simulator ( require xCode installed)
  npm start  # probably running in the separated terminal tab to serve your application
```

Warning: 

For running an ios emulator, you need to install [ios-sim](https://www.npmjs.com/package/ios-sim) version 3.0.0 or higher via `npm install ios-sim -g` before you could run `cordova run --emulator`

Note:  

Originally, I want to have some commands in **ember-rocks** to symlink some common useful Cordova commands. For example, `em mobile --add ios` map to `cordova platform add ios`, `em mobile --run` map to `cordova run --emulator`. In this approach, it would add up lots of additional options into the `em mobile` command. Although it could provide some useful shortcuts like auto `cd`ing *cordova* folder and abstract out some `cordova` learning curve by staying in *em* magics, it does add lots of **API** options to the **ember-rocks** project. I want to have a very simple **API** for users to comsume so that I decide to leave those features out of the core of the  **ember-rocks**. 

As a mobile application developer, you should be in the `~/build/cordova` folder with [cordova](https://www.npmjs.org/package/cordova) installed in your computer globally. You could use `cordova` command primarily to do whatever you want to your *ember* powered web app. If you have any question with this decision, feel free to create an issue or feature requests so that we could discuss it further. 


## Coding Styles

Following the coding standard from [Ember.js best practice](https://github.com/emberjs/ember.js/blob/master/.jscsrc), use coding quality project - [JSCS](https://github.com/jscs-dev/node-jscs) to assert code quality. To verify your own code, first, install **jscs** global via `npm install jscs -g`. Then run a test, 

Running `jscs` in a easy way ( Bonus: running jshint and jscs in one shot ):

```bash
  # running jscs code quality assertion
  gulp jscs

  # running both jshint and jscs in one command
  gulp lint
```

Running `jscs` in a hard way:

```bash
  # make sure that `jscs` installed globally
  jscs --version  

  # client side *.js code quality
  jscs client/**/*.js

  # server side *.js code quality
  jscs server/**/*.js
  
  # gulpfile.js code quality
  jscs *.js
```

## Roadmap

- Well-defined structure for each `gulp` task. User could pick `sass`, `less`, `stylus` etc when run `em new` command
- Native support Ember Addon system
- Koa replace express server


## Deprecated module or Use in your own project 

These projects comes with **Ember Rocks** v0.8.0 or prior, but moving forward, those modules are going to optional installation to speed up the initial scaffolding. We recommend to use them to improve your productivity.

- [debug](https://www.npmjs.com/package/debug)

small debugging utility. tiny node.js debugging utility modelled after node core's debugging technique.

- [gulp-cache](https://www.npmjs.com/package/gulp-cache)

A cache proxy task for Gulp. A temp file based caching proxy task for Gulp. 
It may add back in the future. Or if you like to contribute, submit a PR. 

- [gulp-changed](https://www.npmjs.com/package/gulp-changed)

Only pass through changed files.
It may add back in the future. Or if you like to contribute, submit a PR. 

- [gulp-size](https://www.npmjs.com/package/gulp-size)

Display the size of your project. Logs out the total size of files in the stream and optionally the individual file-sizes.

```js
  gulp.src(src, {base: 'server/.'})
    .pipe(gulp.dest(dest))
    .pipe($.size({title: '[-log:] server folder'}));
```

- [psi](https://www.npmjs.com/package/psi)

PageSpeed Insights with reporting.

Usage example:

```js
var pagespeed = require('psi');

// Run mobile and desktop performance tests via Google PageSpeed Insights
// For a production build process, register for an API key from Google Developer Console
// See http://goo.gl/RkN0vE for info key: 'YOUR_API_KEY'
// More Info:  https://www.npmjs.org/package/psi
gulp.task('pagespeed', pagespeed.bind(null, {
  // key: key
  nokey:    'true',
  // Update `url` below to the public URL for your site
  url:      'http://mattmadesign.com',
  // default strategy: desktop. Values: mobile, desktop
  strategy: 'mobile',
  locale:   'en_US'
}));
```

- [gulp-uncss](https://www.npmjs.com/package/gulp-uncss)

Remove unused CSS selectors. It is bit of risky to use this module in my opinion. But it is a great one to reduce the size of your style sheet.

Usage example:

```js
 gulp.src(src)
  .pipe(assets)
  .pipe(if('*.js', uglify({preserveComments: 'some'})))
  .pipe(if('*.css', uncss({
     html: src,
     ignore: [ ] // CSS Selectors for UnCSS to ignore
  })))
  .pipe($.if('*.css', csso()))
  .pipe(assets.restore())
  .pipe(useref())
  .pipe(if('*.html', minifyHtml()))
  .pipe(gulp.dest(dest));
```


## Contributing
Anyone can help make this project better - check out the [Contributing guide](./CONTRIBUTING.md). 


## Release History

### 0.9.4 (02/18/15)

- Replace **gulp-6to5** to **gulp-babel**. Due to project *6to5* project renamed to [*Babel*](http://babeljs.io/)

### 0.9.3 (02/14/15)

- [BugFix] [Unhandled rejection TypeError](https://github.com/mattma/ember-rocks/issues/12). Alert user with failure message and warning message when necessary   

#### 0.9.2 (02/08/15)

- [Major/Breakage] Update `Ember` version to `v1.10.0`, and use `HTMLBars` instead of `handlebars`
- Update the `gulp-6to5` to v3.0.0, update the `6to5-core` the v3.0.0+
- Major rewrites on most of internal modules, huge performance boost, and improved code readability 
- Use Promise A plus spec internally to handle inefficient callback hell issues. Take full advantage of Async operation.
- Removed unused *gulp-plugins* from "devDependencies" of **package.json** to speed up the initial `npm` module download time
- Update the module [`gulp-htmlbars`](https://www.npmjs.com/package/gulp-htmlbars) to latest v0.3.0
- [ENHENCEMENT] Sass pre-compiler (gulp sass task) has been dramatically simplified to provide a better and faster css compilation.
- Replaced the testing framework from Mocha to Lab, assertion library from Chai to Code.

#### 0.8.0 (01/24/15)

- [ENHENCEMENT] Used new module [`gulp-htmlbars`](https://www.npmjs.com/package/gulp-htmlbars) which is maintained by author(myself) of `ember-rocks`. Read [more details](https://github.com/mattma/gulp-htmlbars/blob/master/README.md).
  By using `gulp-htmlbars`, successfully removed the dependency of those modules: `ember-cli-htmlbars`, `ember-handlebars`, `gulp-handlebars`

#### 0.7.0 (01/23/15)

- [New Feature] Generator command take an optional flag `-T` or `--test` to generate the its unit test file. ex: `em g route:post --test` 
- [ENHENCEMENT] Calling any `em` commands at root level or anywhere in your project, it will execute the task(s) as you expected. 
- Major refactoring generator command and generation process
- [BugFix] When `type` is `route` or `component`, template file is already existed, it won't kill the process. simply output a warning.
- [BugFix] Fixed all **jshint** errors in the project
- [New Feature] introduce code quality tool `jscs`, fixed all **jscs** issues in the project
- [ENHENCEMENT] Update module dependencies and fixed the issue of [liftoff 2x / v8flags 2x release](https://github.com/mattma/ember-rocks/issues/10)
- Updated the project and testing documentation

#### 0.6.0 (Christmas Day, 2014)

- [Major/New Command] `em test`|`em t` has been added into the project. It will auto watch/compile/run/rerun all existing integration/unit tests. See `em --help` from CLI or [Testing your app](#testing-your-app) for more details.
- [Major/New Generators] A whole suite of testing generators (integration & unit) have been added into `em generate`|`em g` command and followed the existing generator syntax. ex: `em g [*-]test(s):[name]`. See `em g -h` in CLI for usage and description. Here is a list of new generators: 'test', 'adapter-test', 'component-test', 'controller-test', 'helper-test', 'initializer-test', 'mixin-test', 'model-test', 'route-test', 'serializer-test', 'transform-test', 'util-test', 'view-test'
- New set of unit tests on generating integration/unit test files have been added for testing the behavior of `em g [*-]test:[name]` command
- Prepare a sample integration test inside `client/tests/integration` with two passing tests when run `em t` at first time
- Global string utility to handle project-wide string transformation
- Update testing documentation in Readme

#### 0.5.2 (12/19/14)

- Using the official [gulp-wrap-amd](https://github.com/phated/gulp-wrap-amd/pull/10) module instead of my fork which has been successfully merged and released to v0.4.0
- Using bower to install `almond` dependency and remove the custom almond.js script, add shim to support new feature
- `Handlebars` exists in the global scope and also can be imported as an AMD module 

#### 0.5.1 (12/18/14)

- Simplified the way of compiling Handlebars's Htmlbars by forking two modules. [gulp-handlebars](https://github.com/lazd/gulp-handlebars/pull/44) and [gulp-wrap-amd](https://github.com/phated/gulp-wrap-amd/pull/10)
- Used the official **ember-cli-htmlbars** repo instead of the fork version
- Update packages' version of 'dependencies' and 'devDependencies', patches and fixes applied on the newer version requirements
- Address/Apply the previous [PR](https://github.com/mattma/ember-rocks/pull/6) by an awesome contributor

#### 0.4.1 (12/14/14)

- [Major/Breakage] Bump up versions - Ember#1.9.0, Handlebars#2.0.0. This is a major update and it will breaks the previous builds. Due to [Handerbars#2.0.0 changelogs](https://github.com/wycats/handlebars.js/blob/master/release-notes.md). Read [here](http://emberjs.com/blog/2014/10/16/handlebars-update.html) and [here](http://emberjs.com/blog/2014/12/08/ember-1-9-0-released.html) to see why it is not backward compatible.
- 0.4.0 has an missing typo and fixed in the new release v0.4.1

#### 0.3.1 (12/13/14)

- [ENHENCEMENT] Replace the old `gulp-ember-handlebars`(deprecated module) with the recommended module `gulp-handlebars` with Ember-Rocks custom `gulp-defined-module` to handle AMD module dependencies. 
- [BugFix] With the newest Ember#1.9.0 ( Released on 12/8/14 ), it required the new hard dependencies of `handlebars#2.0.0`, so that `bower install` dependency will confuse with the right version to install, it breaks the `em new` command in some sort. 

#### 0.3.0 (11/19/14)

- Replace Traceur ES6 compiler with 6to5 compiler. Now, the compiled ember code is clean and readable. In addition, it has a javascript sourcemap support so that it could trace back to the definition of original ES6 source code. 
- [BugFix] In the build process, recursive copy server directory issue has been fixed. 

#### 0.2.0  (11/14/14)  

- Bump up to the latest version for ember#1.8.1, ember-data#1.0.0-beta.11, and ember-resolver#0.1.10
- Replace the deprecated module "gulp-ember-handlebars" with the recommended module "gulp-handlebars"
- [BugFix] sass/css sourcemap can be debugged directly in the chrome devtool with the right path and line number
- [BugFix] livereload script need to be removed in the production environment

#### 0.1.11  (8/20/14)  

- Add command for building a Cordova application ( `em mobile` | `em m`) 

#### 0.1.9  (8/13/14)  

- Add command alias ( `em server` | `em s`) && ( `em build` | `em b`)
- Dev and Prod environment can use `npm start` to kick out a Node server


#### 0.1.8  (8/7/14)  

- Fix sass loading partial resource issue

#### 0.1.7  (8/2/14)     

- Add badges, Travis CI, Lisense
- more info on project README
- jshint 100% free on all javascript files
- lots of bug fixes


#### 0.1.0  (8/1/14)     

- Initial Release


## License

Copyright (c) 2015 [Matt Ma](http://mattmadesign.com)

Ember Rocks is [MIT Licensed](./LICENSE.md).

[npm-badge-url]: https://nodei.co/npm/ember-rocks/
[npm-badge-image]: https://nodei.co/npm/ember-rocks.png?global=true

[npm-url]: https://www.npmjs.org/package/ember-rocks
[npm-image]: http://img.shields.io/npm/v/npm.svg

[travis-image]: https://travis-ci.org/mattma/ember-rocks.svg?branch=master
[travis-url]: https://travis-ci.org/mattma/ember-rocks

[dependency-image]: https://david-dm.org/mattma/ember-rocks.svg
[dependency-url]: https://david-dm.org/mattma/ember-rocks
