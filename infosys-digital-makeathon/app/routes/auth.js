module.exports = function(app,passport) {

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/success', 
		failureRedirect : '/#signin', 
		failureFlash : true 
	}));

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/success', 
		failureRedirect : '/#signin', 
		failureFlash : true 
	}));

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/#signin');
	});

	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/oauth/twitter/callback', passport.authenticate('twitter', {
		successRedirect : '/success',
		failureRedirect : '/#signin'
	}));
};