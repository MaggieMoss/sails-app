/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	'new': function(req, res) {
		res.view();
	},

	create: function(req, res, next) {
		User.create( req.params.all(), function userCreated (err, user) {
			if (err) {
				console.log(err);
				req.session.flash = {
					err: err
				}
				return res.redirect('/user/new');
			}
			console.log("USER: ", user);
			// After successfully creating the user 
			// redirect to the show action
			res.redirect('/user/show/'+user.id);
		});
	}, 

	show: function(req, res, next) {
		User.findOne(req.param('id'), function foundUser(err, user) {
			if (err) return next(err);
			if (!user) return next();
			Stories.find({"author": user.id}).then(function(stories){
				res.view({ 
					user: user, 
					stories: stories
				});
			});	
		});
	}, 

	index: function(req, res, next) {
		User.find(function foundUsers (err, users) {
			if (err) return next(err);

			res.view({
				users:users
			});
		});
	}, 

	edit: function(req, res, next) {
		User.findOne(req.param('id'), function foundUser (err, user) {
			if (err) return next(err);
			if (!user) return next();

			res.view({
				user:user
			});
		});
	}, 

	update: function(req, res, next) {
		User.update(req.param('id'), req.params.all(), function userUpdated(err) {
			if (err ) {
				return res.redirect('/user/edit/'+req.param('id'));
			}
			res.redirect('/user/show/' + req.param('id'));
		});
	}, 

	destroy: function(req, res, next) {
		User.findOne(req.param('id'), function foundUser(err, user) {
			if (err) return next(err);

			if (!user) return next('User doesn\'t exist');

			User.destroy(req.param('id'), function userDestroyed(err) {
				if (err) return next(err);
			});

			res.redirect('/user');
		})
	}
};

