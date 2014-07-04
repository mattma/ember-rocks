var jsSHA = require('../vendors/jsSHA/src/sha512').jsSHA;

module.exports = {

	'verifyPassword': function( tempUsername, tempPassword, password, res, callback) {

		// best practice, https://crackstation.net/hashing-security.htm#salt
		// donot use username or such, better create the same longth of random strings.
		// http://caligatio.github.io/jsSHA/
		// My salt is the SHA-512 way of username: qianlimattma  &  password: bestdeveloperonearth
		var salt = 'f3a1abc497db02f4b1428b2d9ab1fd1c3542e8b815af2f5a029a2d771135defa1997a904a2e3b2a0a80c3d1932f404a649a6f9b13c40051385a929131b0cfa45';

		var shaObj =  new jsSHA(tempUsername, 'TEXT'),
			signature = salt + tempPassword,
			tempPass = shaObj.getHMAC(signature, 'TEXT', 'SHA-512', 'HEX');

		callback(tempPass, password, res);
	}
};




