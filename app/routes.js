// app/routes.js

// load the project model
var Project = require('./models/project');

// expose the routes to our app with module.exports
module.exports = function(app,passport) {
    // =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	app.get('/projects', function(req, res) {
		res.render('projects.ejs'); // load the index.ejs file
	});

    // =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/projects', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

    // process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


    // api ---------------------------------------------------------------------
    // get all projects
    app.get('/api/projects', function(req, res) {

        // use mongoose to get all projects in the database
        Project.find(function(err, projects) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(projects); // return all todos in JSON format
        });
    });

    // create project and send back all todos after creation
    app.post('/api/projects', function(req, res) {

        // create a project, information comes from AJAX request from Angular
        Project.create({
            projectName : req.body.projectName,
            projectDescription : req.body.projectDescription,
            skills: req.body.skills,
            email: req.body.email,
            user_id: req.user._id,
            userName: req.user.local.userName
        }, function(err, project) {
            if (err)
                res.send(err);

            // get and return all the projects after you create another
            Project.find(function(err, projects) {
                if (err)
                    res.send(err)
                res.json(projects);
            });
        });

    });

    // delete a project
    app.delete('/api/projects/:project_id', function(req, res){
    Project.findOne({ '_id': req.params.project_id },function (err, projects) {
    if (err) res.send('not your business');
    if(req.user._id==projects.user_id){
        Project.remove({
            _id : req.params.project_id
        }, function(err, project) {
            if (err)
                res.send(err);

        });
    
      // get and return all the projects after you create another
      Project.find(function(err, projects) {
                if (err)
                    res.send(err)
                res.json(projects);
            });
        
    }
    });
       //console.log(req.user._id);
       //console.log(req.params.user_id);
       
    });
};
// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

//function checkUser(req, res, next) {

	// if user is authenticated in the session, carry on
	//if (req.user==req.params.user_id)
		//return next();

//}
