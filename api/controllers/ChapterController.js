/**
 * ChapterController
 *
 * @description :: Server-side logic for managing chapters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function(req, res, next) {
		res.view();
	},
	create: function(req, res, next) {
		console.log(req.params.all());
		Chapter.create( req.params.all(), function chapterCreated (err, chapter) {
			if (err) {
				console.log(err);
				req.session.flash = {
					err: err
				}
				return res.redirect('/user/new');
			}
			console.log("Chapter: ", chapter);
			// After successfully creating the user 
			// redirect to the show action
			res.redirect('/chapter/show/'+chapter.id);
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

