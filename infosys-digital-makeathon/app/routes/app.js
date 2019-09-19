module.exports = function(app) {

	app.get('/', function(req, res){
		res.render('index', { 
			title: 'Welcome!', 
			projectUrl:"https://github.com/adisakshya/infosys-digital-makeathon",
			message: req.flash('signinMessage') 
		});
	});

	app.get('/success', function(req, res){
		res.render('success', { title: 'Congrats!' });
	});
};

