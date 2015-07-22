/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');
module.exports = {
	'new': function(req, res) {
		res.view('session/new');
	}, 

	create: function(req, res, next) {
		if(!req.param('email') || !req.param('password')){
			var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired', message: 'You must enter both a username and a password'}]
			
			req.session.flash = {
				err: usernamePasswordRequiredError
			}
			console.log("two");
			res.redirect('/session/new');
			return
		}
		// try to find the user by their email address
		User.findOne().where({'email': req.param('email')}).then(function(user) {
			if(!user){
				var noAccountError = [{name: 'noAccount', message: 'The email addres' + req.param('email') + 'not found'}]
				req.session.flash = {
					err: noAccountError
				}
				res.redirect('/session/new');
				return;
			}

			// compare passwords - if they match - log user in
			bcrypt.compare(req.param('password'), user.password, function(err, valid) {
				if(err) return next(err);

				if(!valid){
					var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatch', message: 'Invalid username and password combination'}]
					req.session.flash = {
						err: usernamePasswordMismatchError
					}
					res.redirect('/session/new')
					return;
				}
				req.session.authenticated = true;
				req.session.User = user;

				res.redirect('/user/show/'+user.id);
			})
		}).catch(function(err){
			console.log("error: ", err)
		})
	}, 

	destroy: function(req, res, next) {
		req.session.destroy();
		res.redirect('/session/new');
	}
};

