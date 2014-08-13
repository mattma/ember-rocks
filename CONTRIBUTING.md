# Contributing

## Local Development Setup 

    git clone https://github.com/mattma/ember-rocks.git
    cd ember-rocks
    npm link

`npm link` is very similar to `npm install -g`, except that instead of downloading the package from the repo the just cloned **ember-rock/** folder becomes the global package. Any changes to the files in the **ember-rock/** folder will immediately affect the global **ember-rock/** package.


## Submit Issues or Features

Think you've found a bug or have a new feature to suggest? Let us know!


## Submit a Pull Request

**We love pull requests**. Here's a quick guide:

- Fork the repo.

- Write any unit test and make it pass. 
   *./test/integration/*.spec.js* any `*.spec.js` test will run via `npm test`

- Commit your changes.

Push to your fork and submit a pull request. Please provide us with some explanation of why you made the changes you made. For new features make sure to explain a standard use case to us.

- Update the Changelog. 


**Note**: Update to the most recent master release if possible. Search for similar issues. It's possible somebody has encountered this bug already. The more information you provide, the easier it is for us to validate that there is a bug and the faster we'll be able to take action.


NOTE: Partially copied from [ember-cli](https://github.com/stefanpenner/ember-cli/blob/master/CONTRIBUTING.md)
