/**
 * ChapterController
 *
 * @description :: Server-side logic for managing chapters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function(req, res, next) {
		console.log(req.params.all().id)
		res.view({
			story_id: req.params.all().id
		});
	},
	create: function(req, res, next) {
		console.log(req.params.all());
		Stories.findOne(req.params.all().story_id, function storyFound(err, story){
			if(!story){ return res.redirect('/stories/show/'+req.params.all().story_id) }
			var params = req.params.all();
			params.story = story;
			Chapter.create( req.params.all(), function chapterCreated (err, chapter) {
				if (err) {
					console.log("Error: ", err);
					req.session.flash = {
						err: err
					}
					return res.redirect('/chapter/new/id?='+req.params.all().story_id);
				}
				console.log("Chapter: ", chapter);
				// After successfully creating the user 
				// redirect to the show action
				res.redirect('/chapter/show/'+chapter.id);
			});
		});
	}, 
	show: function(req, res, next) {
		Chapter.findOne(req.param('id'), function foundChapter(err, chapter) {
			if (err) return next(err);
			if (!chapter) return next();
			res.view({ 
				chapter: chapter
			});
		});
	}
};

