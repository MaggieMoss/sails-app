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
		if(req.session.authenticated){
			
			console.log(req.session);
			// add it to params objectsk
			var variables = req.params.all();
			variables.author = req.session.User.id;
			console.log(variables)
			Stories.create( variables, function storyCreated (err, story) {
				if (err) {
					console.log(err);
					req.session.flash = {
						err: err
					}
					return res.redirect('/stories/new');
				}

				// After successfully creating the user 
				// redirect to the show action
				res.redirect('/stories/show/'+story.id);
			});
		} else {
			res.redirect('/session/new');
		}
	}, 

	index: function(req, res, next) {
		Stories.find(function findStories(err, stories){
			res.view({
				stories: stories
			})
		})
	}, 

	show: function(req, res, next) {
		Stories.findOne(req.param('id'), function foundStory(err, story) {
			if(!err){
				Chapter.find({ story: req.param('id') }).then(function foundChapters(chapters, err){
					if(err){ 
						console.log("ERR: ", err);
						res.redirect('/stories/index')
					} else {
						res.view({
							story: story, 
							chapters: chapters
						});
					} 
				});
			}	
		});
	}
};

