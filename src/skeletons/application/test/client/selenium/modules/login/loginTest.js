var should = require('chai').should(),
	webdriver = require('selenium-webdriver'),
	TestSupport = require('../../support/testSupport'),
	support = new TestSupport();

var driver;
var baseUrl;

describe('client.login', function() {

	before(function(done) {
		driver = support.init();
		//baseUrl = support.getBaseUrl();
		baseUrl = 'http://localhost:3000/#login';
		done();
	});

	it('should not be possible to login and error message displayed if invalid credentials are entered', function(done) {
		var input = {
			'invalid_username': 'invalid@mattmadesign.com',
			'invalid_password': 'notvalid'
		};

		support.home().then(function(baseUrl) {
			driver.findElement(webdriver.By.id('username')).sendKeys(input.invalid_username);
			driver.findElement(webdriver.By.id('password')).sendKeys(input.invalid_password);
			driver.findElement(webdriver.By.id('loginSubmit')).click();

			// Verify we see the login failed message.
			var errorMsg;
			driver.wait(function() {
				support.getInnerPlainText(webdriver.By.id('loginMessage')).then(function(errmsg) {
					errorMsg = errmsg;
				})
				return (errorMsg && errorMsg != '');
			}, 30000).then(function() {
				errorMsg.should.equal('Username and Password are incorrect');
				done();
			});
		});
	});

	// it('should be possible to login by entering a valid username and password', function(done) {
	// 	support.home().then(function(baseUrl) {
	// 		// Login
	// 		driver.findElement(webdriver.By.id('username')).sendKeys(support.getConfig().username);
	// 		driver.findElement(webdriver.By.id('password')).sendKeys(support.getConfig().password);
	// 		driver.findElement(webdriver.By.id('login-button')).click();
	// 		support.waitForUrl(baseUrl + '/adtemplate').then(function(actualUrl) {
	// 				actualUrl.should.equal(baseUrl + '/adtemplate');
	// 				done();
	// 		});
	// 	});
	// });
	// it('clicking logout should take the user to the login page', function(done) {
	// 	support.click('a', 'header', 'Logout');
	// 	support.waitUntilElementPresent(webdriver.By.id('username')).then(function(){
	// 		done();
	// 	})
	// });
	// it('should be possible for a pilot user to login and see the questionaire page', function(done) {
	// 	support.home().then(function(baseUrl) {
	// 			// Login
	// 			driver.findElement(webdriver.By.id('username')).sendKeys('pilot-user1@adchemy.com');
	// 			driver.findElement(webdriver.By.id('password')).sendKeys('adchemy');
	// 			driver.findElement(webdriver.By.id('login-button')).click();
	// 			support.waitForUrl(baseUrl + '/questionnaire').then(function(actualUrl) {
	// 					actualUrl.should.equal(baseUrl + '/questionnaire');
	// 					support.click('a', 'header', 'Logout');
	// 					support.waitUntilElementPresent(webdriver.By.id('username')).then(function(){
	// 							done();
	// 					})
	// 			});
	// 	});
	// });
	// it('should be possible for a beta user to login and see the reporting page', function(done) {
	// 	support.home().then(function(baseUrl) {
	// 			// Login
	// 			driver.findElement(webdriver.By.id('username')).sendKeys('beta-user1@adchemy.com');
	// 			driver.findElement(webdriver.By.id('password')).sendKeys('adchemy');
	// 			driver.findElement(webdriver.By.id('login-button')).click();
	// 			support.waitUntilElementPresent(webdriver.By.id('reporting-dashboard')).then(function(){
	// 					done();
	// 			});
	// 	});
	// });
	// it('a beta user should not see the org dropdown', function(done) {
	// 	support.home().then(function(baseUrl) {
	// 		// Login
	// 		driver.findElement(webdriver.By.id('username')).sendKeys('beta-user1@adchemy.com');
	// 		driver.findElement(webdriver.By.id('password')).sendKeys('adchemy');
	// 		driver.findElement(webdriver.By.id('login-button')).click();
	// 		support.waitUntilElementPresent(webdriver.By.id('reporting-dashboard')).then(function(){
	// 				driver.isElementPresent(webdriver.By.id('account-selector')).then(function(result) {
	// 						result.should.equal(false);
	// 						done();
	// 				});
	// 		});
	// 	});
	// });
	// // the following 2 tests are failing because of driver.getUrl() is not able to get the url for qa.adchemy.com (without http or https). Need to get the alternate for this
	// /*it('a un authenticated user should be not be taken to the requested page without showing the login page', function(done) {
	// 		driver.get(baseUrl + '/reporting').then(function() {
	// 				support.waitForUrl(baseUrl + '/').then(function(actualUrl) {
	// 						actualUrl.should.equal(baseUrl + '/');
	// 						done();
	// 				});
	// 		});
	// });
	// it('logging in again should take the user to the orginally requested page', function(done) {
	// 		driver.findElement(webdriver.By.id('username')).sendKeys(support.getConfig().username);
	// 		driver.findElement(webdriver.By.id('password')).sendKeys(support.getConfig().password);
	// 		driver.findElement(webdriver.By.id('login-button')).click();
	// 		support.waitForUrl(baseUrl + '/reporting').then(function(actualUrl) {
	// 				actualUrl.should.equal(baseUrl + '/reporting');
	// 				done();
	// 		});
	// });    */

	after(function(done) {
		driver.quit().then(function(){
			done();
		});
	});

});
