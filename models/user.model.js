"use strict";
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// Define our Schema for signing in
const UserSchema = new Schema({
	email : {
		type : String,
		required : true,
		unique: true
	},
	password : {
		type : String,
		required : true
	}
});

UserSchema.pre('save', async function(next) {
	const user = this;
	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;
	next();
});

// Compare given password hash with users password hash in bcrypt
UserSchema.methods.isValidPassword = async function(password) {
	const user = this;
	const compare = await bcrypt.compare(password, user.password);
	return compare;
}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;