const express = require("express");
const mongoose = require('mongoose');
const passport = require('passport');
const bp = require("body-parser");

const app = express();
const port = 3001;

//const UserModel = require("./models/user.model");

// Setup Mongoose
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://127.0.0.1:27017/passport-jwt", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

// Auth Middleware
require('./auth/auth');

// Setup Express
app.use(bp.urlencoded({ extended: true }))
app.use(bp.json())

// Get Auth routes and API routes
const authRoutes = require("./routes/auth-routes");
const routes = require("./routes/routes");

app.use("/", authRoutes);
app.use("/api/v1/reviews", passport.authenticate( 'jwt', { session : false }), routes );

// Start listening
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});