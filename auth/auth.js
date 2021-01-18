const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/user.model');

// Signup Middleware
passport.use('signup', new localStrategy({

	usernameField : 'email',
	passwordField : 'password'

}, async (email, password, done) => {

	try {

		// Create user with specified email and password
		const user = await UserModel.create({ email, password });
		return done(null, user);

	} catch (error) {
		done(error);
	}
}));

// Login Middleware
passport.use('login', new localStrategy({

	usernameField : 'email',
	passwordField : 'password'

}, async (email, password, done) => {

	try {
		// Find User if they exist, send back response if they don't
		const user = await UserModel.findOne({ email });
		if ( !user ) {
			return done(401, false, { message : 'User not found' });
		}

		// Check if the password is correct
		const validate = await user.isValidPassword(password);
		if ( !validate ) {
			return done(401, false, { message : 'Wrong Password'});
		}

		return done(null, user, { message : 'Logged in Successfully'});
		
	} catch (error) {
		console.log("catch");
		return done(error);
	}
}));

// Our JSON Web Token secret key and query parameter settings
passport.use(new JWTstrategy({
	secretOrKey : 'top_secret',
	jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
	try {
		return done(null, token.user);
	} catch (error) {
		done(error);
	}
}));