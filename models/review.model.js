"use strict";
var dbcon = require('../config/db.config');

var Review = function(review){
	this.BeerName = review.BeerName;
	this.BeerType = review.BeerType;
	this.AlcoholPercentage = review.AlcoholPercentage;
	this.Score = review.Score;
};

// Create
Review.create = function (review, result) {

	// Insert into BeerReviews table
	dbcon.query("INSERT INTO BeerReviews SET ?", review, function (err, res) {
		if (err) {
			console.log("error, ", err);
			result(null, err);
		} else {
			console.log("Created " + res.insertId);
			result(null, res.insertId);
		}
	});

}

// Read unique
Review.returnByID = function (id, result) {

	// Select entry which matches given ID
	dbcon.query("SELECT * FROM BeerReviews WHERE ReviewID = ?", id, function (err, res) {
		if (err) {
			console.log("error, ", err);
			result(null, err);
		} else {
			result(null, res);
		}
	});

}

// Read all
Review.returnAll = function (result) {

	// Select all entries
	dbcon.query("SELECT * FROM BeerReviews", function (err, res) {
		if (err) {
			console.log("error, ", err);
			result(null, err);
		} else {
			console.log("Full Search");
			result(null, res);
		}
	});

}

// Update
Review.update = function(id, review, result) {

	// Update given ID entry in BeerReviews table
	dbcon.query("UPDATE BeerReviews SET BeerName=?, BeerType=?, AlcoholPercentage=?, Score=? WHERE ReviewID = ?",
		[
			review.BeerName,
			review.BeerType,
			review.AlcoholPercentage,
			review.Score,
			id
		],
		function (err, res) {
			if (err) {
				console.log("error, ", err);
				result(null, err);
			} else {
				console.log("Updated review");
				result(null, res);
			}
		}
	);

}

// Delete
Review.delete = function(id, result) {

	// Delete given ID entry from BeerReviews table
	dbcon.query("DELETE FROM BeerReviews WHERE ReviewID = ?", [id], function (err, res) {

		if (err) {
			console.log("error, ", err);
			result(null, err);
		} else {
			result(null, res);
		}

	});

}

module.exports = Review;