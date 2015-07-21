module.exports = function(req, res, next) {
	res.locals.flash = {};

	if(!req.session.flash) return next();
	// _.clone creates a copy 
	res.locals.flash = _.clone(req.session.flash);

	// clear flash
	req.session.flash = {};

	next();
}; 