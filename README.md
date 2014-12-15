# Ember Rocks ( a.k.a em-cli ) 

[![NPM][npm-badge-image]][npm-badge-url]

[![NPM version][npm-image]][npm-url]   [![Build Status][travis-image]][travis-url]   [![Dependency Status][dependency-image]][dependency-url]


> An Em(ber) command line utility to help developer(s) build an ambitious web application. It is highly inspired by other open source projects, [ember-cli](https://github.com/stefanpenner/ember-cli), [ember-tools](https://github.com/rpflorence/ember-tools), [Web Starter Kit](https://github.com/google/web-starter-kit), [Gulp](https://github.com/gulpjs/gulp/).


## Getting Started

```bash
    npm install -g ember-rocks
```

After it is done, you should have a global command `em` available. 
Try `em --help`, you should see a list of helper information. 
Try `em generate --help` to see a specific command helper information.


## Features

- well align with Ember-Cli project
- gulp ( a build tool of choice ) build insanely fast via node stream api
- lighting fast development rebuild system
- live reload on all resources
- super powerful generator system
- Sass language support with CSS sourcemap, trace back to original Sass defination
- ES6 ( Next Version of javascript ) with JS sourcemap, tace back to origional ES6 defination
- hackable express server as back end
- simple command to build a production ready application and ready to be deployed
- tablet and touch device support out of box. Responsive Web Design supported.
- hybird web app on native phone and tablet via Cordova package. For iOS, Andriod, Blackberry, and more

## A sample ember app in the Ember Rocks

**Ember Rocks** comes with a sample application, and user could even have their own set of templates. See [Ember Rocks Template Basic](https://github.com/mattma/Ember-Rocks-Template-Basic) for details.

An express (Node.js) server will handle all requests. A fake user api route will read the RESTful json api on the disk, return the data over the wire when Ember app request the data via latest **Ember Data** library. In real world application, it should be replaced with MongoDB (recommended), CouchDB, etc. It is very easy to integrate with any NoSQL database.  

The fully stylish application works on touch and tablet devices out of box. Try to resize your browser into a smaller screen resolution, you should see an animated effect from the left edge which is the most popular choice of mobile application navigation menu. You could tweak the styles and markup to fit your use cases. 


## Ember-cli is the official **Ember** app CLI tool (Ember#2.0 and forward). Why am I building another em(ber)-cli?

**Ember** is an opinionated framework, and **Ember-cli** has chosen [broccoli](https://github.com/broccolijs/broccoli) as its build tool and [Qunit](https://github.com/jquery/qunit) as its testing tool. **Ember-cli** project is trying to be an universal toolset to fit most of use cases for majority of **Ember** developers. **Ember-Cli** is awesome. 

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
       
    Options:

        -h, --help     output usage information
        -V, --version  output the version number

    Command-Specific Help:

        em [command] --help
```

## TODO

- Add ember testing support with Mocha adapter
   ( It should work with the existing ember rocks architecture )


## Guide

Since the project is highly inspired by [Ember-Cli](http://www.ember-cli.com/), ( both projects even share the same commands but completely different implementation under the hook, i.e. `em(ber) new`, `em(ber) generate`, `em(ber) g`, `em(ber) serve`, `em(ber) build`, etc ), **Ember Rocks** uses the same modules -- [ember resolver](https://github.com/stefanpenner/ember-jj-abrams-resolver), and [ember load initializers](https://github.com/stefanpenner/ember-load-initializers). Ember Modules system ( *client/app/* ) and the resolver guide will apply to **Ember Rocks** modules and the resolver as well.

* Modules and the Resolver [Documentation](http://www.ember-cli.com/#using-modules)

_( More Coming Soon )_


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

Note:  

Originally, I want to have some commands in **ember-rocks** to symlink some common useful Cordova commands. For example, `em mobile --add ios` map to `cordova platform add ios`, `em mobile --run` map to `cordova run --emulator`. In this approach, it would add up lots of additional options into the `em mobile` command. Although it could provide some useful shortcuts like auto `cd`ing *cordova* folder and abstract out some `cordova` learning curve by staying in *em* magics, it does add lots of **API** options to the **ember-rocks** project. I want to have a very simple **API** for users to comsume so that I decide to leave those features out of the core of the  **ember-rocks**. 

As a mobile application developer, you should be in the `~/build/cordova` folder with [cordova](https://www.npmjs.org/package/cordova) installed in your computer globally. You could use `cordova` command primarily to do whatever you want to your *ember* powered web app. If you have any question with this decision, feel free to create an issue or feature requests so that we could discuss it further. 


## Contributing
Anyone can help make this project better - check out the [Contributing guide](./CONTRIBUTING.md).


## Release History

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

Copyright (c) 2014 [Matt Ma](http://mattmadesign.com)

Ember Rocks is [MIT Licensed](./LICENSE.md).

[npm-badge-url]: https://nodei.co/npm/ember-rocks/
[npm-badge-image]: https://nodei.co/npm/ember-rocks.png?global=true

[npm-url]: https://www.npmjs.org/package/ember-rocks
[npm-image]: http://img.shields.io/npm/v/npm.svg

[travis-image]: http://img.shields.io/travis/joyent/node/v0.6.svg
[travis-url]: https://travis-ci.org/mattma/ember-rocks

[dependency-image]: http://img.shields.io/david/strongloop/express.svg
[dependency-url]: https://david-dm.org/mattma/ember-rocks
