const ObjectID = require('mongodb').ObjectID

module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('contacts').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('profile.ejs', {
            user: req.user,
            contacts: result
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// message board routes ===============================================================

    app.post('/contacts', (req, res) => {
      db.collection('contacts').save({firstName:req.body.fName, lastName:req.body.lName, workEmail:req.body.wEmail, personalEmail:req.body.pEmail,  personalPhone:req.body.phoneNum, workPhone:req.body.phoneNumWork, address:req.body.address}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })

    app.put('/contacts', (req, res) => {
      db.collection('contacts')
      .findOneAndUpdate({firstName:req.body.fName, lastName:req.body.lName, workEmail:req.body.wEmail, personalEmail:req.body.pEmail,  personalPhone:req.body.phoneNum, workPhone:req.body.phoneNumWork, address:req.body.address}, {
        $set: {
          firstName:req.body.fName, 
          lastName:req.body.lName, 
          workEmail:req.body.wEmail, 
          personalEmail:req.body.pEmail,  
          personalPhone:req.body.phoneNum, 
          workPhone:req.body.phoneNumWork, 
          address:req.body.address,
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    /*app.put('/thumbDown', (req, res) => {
      db.collection('messages')
      .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
        $set: {
          thumbDown:req.body.thumbDown + 1
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })*/

    /*app.delete('/trash', (req, res) => {
      db.collection('contacts').findOneAndDelete({
        firstName:req.body.fName, 
        lastName:req.body.lName, 
        workEmail:req.body.wEmail, 
        personalEmail:req.body.pEmail,  
        personalPhone:req.body.phoneNum, 
        workPhone:req.body.phoneNumWork, 
        saddress:req.body.address}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Contact deleted!')
      })
    })*/

    app.delete('/trash', (req, res) => {
      console.log('hello world')
      console.log(req.body)
      db.collection('contacts').findOneAndDelete({
        _id: ObjectID(req.body._id)}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { contacts: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { contacts: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
