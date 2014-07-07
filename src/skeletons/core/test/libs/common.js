// Include and setup all the stuff for testing
define(function(require) {
    window.$ = window.jQuery = require('jquery');
    window.chai         = require('chai');
    window.expect       = chai.expect;
    // window.assert       = chai.assert;
    // window.sinonChai    = require('sinon-chai'); // Buggy as hell right now
    // window.jqueryChai   = require('chai-jquery');

    // chai.use(sinonChai);
    // chai.use(jqueryChai);
});
