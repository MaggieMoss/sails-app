/**
 * StoriesController
 *
 * @description :: Server-side logic for managing stories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
 	'new': function(req, res, next) {
		res.view();
	}, 

	create: function(req, res, next) {
		// get user_id somehow. 
		// add it to params objectsk
		console.log(req.params.all());
		// Stories.create( req.params.all(), function storyCreated (err, story) {
		// 	if (err) {
		// 		console.log(err);
		// 		req.session.flash = {
		// 			err: err
		// 		}
		// 		return res.redirect('/stories/new');
		// 	}

		// 	// After successfully creating the user 
		// 	// redirect to the show action
		// 	res.redirect('/stories/show');
		// });
	}
};

