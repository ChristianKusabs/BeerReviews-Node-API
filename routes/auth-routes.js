"use strict";
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Signup route
router.post('/signup', passport.authenticate('signup', { session : false }) , async (req, res, next) => {

	res.json({
		message : 'Signup successful',
		user : req.user
	});

});

// Login route
router.post('/login', async (req, res, next) => {

	// Check with passport
	passport.authenticate('login', async (err, user, info) => {

		try {

			if (err || !user) {

				console.log(err);
				const error = new Error('An Error occurred');
				error.status = err;
				return next(error);

			}

			req.login(user, { session : false }, async (error) => {

				if ( error ) return next(error)

				// If successful login, send back their token
				const body = { _id : user._id, email : user.email };
				const token = jwt.sign({ user : body }, 'top_secret');

				return res.json({ token });
				
			});
		} catch (error) {}
	})(req, res, next);
});

module.exports = router;