var should = require('chai').should(),
	fs = require('fs'),
	webdriver = require('selenium-webdriver');

// ----------------------
// Configuration Setting
// ----------------------
var driver,
	timeoutValue = 90000,
	// Current Support:  chrome|firefox|phantomjs
	testBrowserName = 'firefox';


// ----------------------
// Support File Start
// ----------------------
module.exports = function() {

	this.init = function() {
		driver = new webdriver.Builder().
			usingServer('http://localhost:4444/wd/hub').
			withCapabilities({
				'seleniumProtocol': 'WebDriver',
				// android|chrome|firefox|htmlunit|internet explorer|iPhone|iPad|opera|safari
				'browserName': testBrowserName,
				// The browser version, or the empty string if unknown.
				'version': '',
				// WINDOWS|XP|VISTA|MAC|LINUX|UNIX|ANDROID
				// When requesting a new session, the client may specify ANY to indicate any available platform may be used.
				'platform': 'ANY',
				'javascriptEnabled': true
			}).
			build();
		driver.manage().window().setPosition(0, 0);
		driver.manage().window().setSize(1920, 1080);
		driver.manage().timeouts().implicitlyWait(timeoutValue);
		return driver;
	},

	this.resetTimeout = function() {
		driver.manage().timeouts().implicitlyWait(timeoutValue);
	},

	this.setTimeout = function(newValue) {
		driver.manage().timeouts().implicitlyWait(newValue);
	},

	this.login = function(SKIP_RESET_ACCOUNTS, accountId, USE_PASSWORD_USER, password) {
		var resetOldSemAccount = false;
		var resetNewSemAccount = true;

		if (SKIP_RESET_ACCOUNTS) {
			resetOldSemAccount = false;
			resetNewSemAccount = false;
		}

		var baseUrl = config.baseUrl;
		var username = USE_PASSWORD_USER ? config.changePasswordUsername : config.username;
		var password = password || config.password;
		var account = accountId ? accountId : config.account;
		var accountParam = '&account=' + account;

		return driver.get(baseUrl + '/testSupport/login' + '?username=' + username + '&password=' + password + '&resetOldSemAccount=' + resetOldSemAccount + '&resetNewSemAccount=' + resetNewSemAccount + accountParam).then(function() {
			driver.executeScript('sessionStorage.setItem("accoundId", arguments[0]);', account)
		});
	},

	// this.getBaseUrl = function () {
	// 		return (config.baseUrl);
	// },
	//
	this.home = function() {
		driver.get('http://localhost:3000/#login');

		return this.waitUntilElementPresent(webdriver.By.id('username')).then(function() {
			return 'http://localhost:3000/#login';
		});
	},

	this.waitUntilUrlChanged = function(oldUrl) {
		var newUrl;

		return driver.wait(function() {
			driver.getCurrentUrl().then(function(url) {
				newUrl = url;
			});
			return (newUrl && newUrl != oldUrl);
		}, timeoutValue).then(function() {
			return newUrl;
		});
	},

	this.waitForUrl = function(expectedUrl) {
		var actualUrl;
		return driver.wait(function() {
			driver.getCurrentUrl().then(function(url) {
				actualUrl = url;
			});
			return (actualUrl && actualUrl == expectedUrl);
		}, timeoutValue).then(function() {
			return actualUrl;
		});
	},

	this.waitUntilElementPresent = function(element) {
		var present;

		return driver.wait(function() {

			driver.isElementPresent(element).then(function(result) {
				present = result;

			});

			return present;
		}, timeoutValue);
	},

	this.waitUntilElementNotPresent = function(element) {
		var present;
		var that = this;

		return driver.wait(

		function() {
			that.setTimeout(timeoutValue / 4);
			driver.isElementPresent(element).then(function(result) {
				present = result;
				console.error(result);
			});

			return !present;
		}, timeoutValue).then(

		function(value) {
			that.resetTimeout();
			return value;
		}, function(err) {
			console.error(err);
			that.resetTimeout();
			throw err;
		});
	},

	this.waitUntilElementInvisible = function(element) {
		return this.waitUntilElementNotPresent(element);
	}

	this.waitUntilElementVisible = function(locator) {
		var that = this;
		var visible;

		return driver.wait(function() {
			that.locateElement(locator).isDisplayed().then(function(displayed) {
				visible = displayed;
			});

			return visible;
		}, timeoutValue);
	},

	this.waitUntilInnerHtmlChanged = function(element, oldContent) {
		var newContent;

		return driver.wait(function() {
			element.getInnerHtml().then(function(content) {
				newContent = content;
			});
			return (newContent && newContent != oldContent);
		}, timeoutValue).then(function(value) {
			return newContent;
		});
	},

	this.waitUntilTextChanged = function(locator, oldText) {
		var newText;

		return driver.wait(_.bind(function() {
			this.locateElement(locator).getText().then(function(text) {
				newText = text;
			});
			return (newText && newText != oldText);
		}, this), timeoutValue).then(function(value) {
			return newText;
		});
	},

	this.waitUntilTextChangedTo = function(locator, newText) {
		var currentText;

		return driver.wait(_.bind(function() {
			this.locateElement(locator).getText().then(function(text) {
				currentText = text;
			});
			return currentText && (currentText === newText);
		}, this), timeoutValue);
	},


	this.waitUntilContentChanged = function(element, oldContent) {
		var newContent;

		if (!oldContent) {
			this.locateElement(element).getInnerHtml().then(function(content) {
				oldContent = content;
			});
		}

		return driver.wait(_.bind(function() {
			this.locateElement(element).getInnerHtml().then(function(content) {
				newContent = content;
			});
			return (newContent && newContent != oldContent);
		}, this), timeoutValue);
	},

	this.waitUntilValueChanged = function(locator, oldValue) {
		var newValue;
		var that = this;

		return driver.wait(function() {
			that.locateElement(locator).getAttribute('value').then(function(value) {
				newValue = value;
			});
			return (newValue && newValue != oldValue);
		}, timeoutValue).then(function() {
			return newValue;
		});
	},

	this.waitUntilInnerPlainTextChanged = function(element, oldText) {
		var that = this;
		var newText;

		return driver.wait(function() {
			that.getInnerPlainText(element).then(function(text) {
				newText = text;
			});
			return (newText && newText != oldText);
		}, timeoutValue).then(function() {
			return newText;
		});
	},

	this.waitUntilInnerPlainTextChangedTo = function(locator, expectedvalue) {
		var that = this;
		var newText;

		return driver.wait(function() {
			that.getInnerPlainText(locator).then(function(text) {
				newText = text;
			});
			return (newText && newText == expectedvalue);
		}, timeoutValue).then(function() {
			return newText;
		});
	},

	this.findElement = function(type, element, value) {
		return this.locateElement(this.element(type, element, value));
	},

	this.click = function(type, element, value) {
		return this.locateElement(this.element(type, element, value)).click();
	},

	this.sureClick = function(locator) {
		return this.locateElement(locator).click();
	},

	this.element = function(type, element, value) {
		return webdriver.By.xpath("//" + type + "[@data-element='" + element + (value ? "' and @data-element-value='" + value + "']" : "']"));
	},

	this.dragAndDrop = function(dragElement, dropElement, dropOffset) {
		if (!dropOffset) dropOffset = {
			x: 0,
			y: 0
		};
		return (
		driver.findElement(dragElement).then(function(origin) {
			driver.findElement(dropElement).then(function(dest) {
				origin.click();
				driver.actions().mouseDown(origin).mouseMove(dest, dropOffset).perform().then(function() {
					driver.actions().mouseUp().perform();
				})
			})
		}));
	},

	this.doubleClick = function(element) {
		driver.findElement(element).then(function(e) {
			driver.actions().doubleClick(e).perform();
		});
	},

	this.getInnerPlainText = function(locator) {
		var that = this;
		return this.waitUntilElementPresent(locator).then(function(present) {
			if (present) {
				return that.locateElement(locator).getInnerHtml().then(function(html) {
					return html.replace(/<(?:.|\n)*?>/gm, '').replace(/\s+/g, ' ').trim();
				});
			} else {
				return webdriver.promise.resolved('');
			}
		});
	},

	this.getValidationErrorMessage = function() {
		return this.waitUntilElementPresent(webdriver.By.css('span.error-msg')).then(function(present) {
			if (present) {
				var el = this.locateElement(webdriver.By.css('span.error-msg'));
				return el.getInnerHtml().then(function(html) {
					return html.replace(/<(?:.|\n)*?>/gm, '').replace(/\s+/g, ' ').trim();
				});
			} else {
				return '';
			}
		});
	},

	this.makeVisible = function(element) {
		var hiddenElement = driver.findElement(element);
		return (
		driver.executeScript('$(arguments[0]).css("display","block");', hiddenElement));
	},

	this.makeVisibleAndClick = function(element) {
		var hiddenElement = driver.findElement(element);
		driver.executeScript('$(arguments[0]).css("display","block");', hiddenElement);
		hiddenElement.click();
	},

	this.mouseHover = function(element) {
		driver.findElement(element).then(function(e) {
			driver.actions().mouseMove(e).perform();
		});
	},

	this.assertEquals = function(a, b) {
		if (a !== b) {
			throw new Error("values are not equal");
		}
	},

	this.setSelectValue = function(select, value) {
		driver.executeScript("$(arguments[0]).val(arguments[1]).trigger('change');", select, value);
	},

	this.setCustomSelectValue = function(select, value) {
		var that = this;

		driver.executeScript("$(arguments[0]).click();", select);
		this.waitUntilElementVisible(webdriver.By.css('ul.list')).then(function() {
			that.mouseHover(webdriver.By.css('[data-value="' + value + '"]'));
			driver.sleep(500);
			that.locateElement(webdriver.By.css('[data-value="' + value + '"]')).click();
		});
	},

	this.takeScreenshot = function(filePath) { //full file path and filename to be a .png file
		driver.takeScreenshot().then(function(image) {
			fs.writeFile(filePath, new Buffer(image, "base64"), function(err) {});
		});
	},

	this.performElementMethod = function(locator, method, args) {
		var done = false;
		var promise;
		var that = this;

		return driver.wait(function() {
			that.setTimeout(timeoutValue / 4);
			if (!done) {
				driver.findElement(locator).then(

				function(element) {
					if (element !== undefined) {
						promise = element[method].apply(element, args).then(

						function(value) {
							if (value !== undefined) {
								done = true;
							}
							return value;
						}, function(e) {
							console.error('performElementMethod: ' + method);
							console.error(e);
						});
					}
				}, function(e) {
					console.error('performElementMethod: findElement');
					console.error(e);
				});
			}

			return done;
		}, timeoutValue)

		.then(

		function() {
			that.resetTimeout();
			return promise;
		}, function(e) {
			console.error('performElementMethod: wait timeout');
			console.error(e);
			that.resetTimeout();
			throw e;
		});
	},

	this.locateElement = function(locator) {
		var that = this;

		return {
			click: function() {
				return that.performElementMethod(locator, 'click');
			},

			isDisplayed: function() {
				var args = [].slice.call(arguments);
				return that.performElementMethod(locator, 'isDisplayed');
			},

			getText: function() {
				return that.performElementMethod(locator, 'getText');
			},

			getAttribute: function(name) {
				return that.performElementMethod(locator, 'getAttribute', [name]);
			},

			getInnerHtml: function() {
				return that.performElementMethod(locator, 'getInnerHtml');
			},

			clear: function() {
				return that.performElementMethod(locator, 'clear');
			},

			sendKeys: function(var_args) {
				var args = [].slice.call(arguments);
				return that.performElementMethod(locator, 'sendKeys', args);
			}
		}
	}
}
