'use strict';
const mysql = require('mysql');

// Mysql connection settings
const dbcon = mysql.createConnection({
	host: 'localhost',
	user: 'beerman',
	password: 'password123',
	database: 'node_test_db'
});

// Connect to the database using settings above
dbcon.connect(function(err) {
	if (err) throw err;
	console.log("Connected to db");
});

module.exports = dbcon;