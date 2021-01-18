'use strict';

const Review = require('../models/review.model');

// Create
exports.create = function(req, res) {

	const newReview = new Review(req.body);

	// Check to see we're not missing detailss
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {

		// Didn't give us enough info, send back reply
		res.status(400).send({
			error: true,
			message: "Incomplete Fields"
		});

	} else {

		// Run create function from Review model
		Review.create(newReview, function(err, review) {
			if (err) {
				res.send(err);
			} else {
				res.json({
					error: false,
					message: "Review successfully added.",
					data: review
				})
			}
		})
	}
};

// Read unique
exports.returnAll = function(req, res) {

	// Run returnAll function from Review model
	Review.returnAll( function(err, review) {

		if (err) {
			res.send(err);
		} else {
			res.send(review);
		}
	});
};

// Read all
exports.returnByID = function(req, res) {

	// Run returnByID function from Review model
	Review.returnByID(req.params.id, function(err, review) {

		if (err) {
			res.send(err);
		} else {
			res.json(review);
		}
	});
}

// Update
exports.update = function(req, res) {

	// Check to see we're not missing details
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {

		// Didn't give us enough info, send back reply
		res.status(400).send({
			error: true,
			message: "Incomplete Fields"
		});

	} else {

		// Run update function from Review model
		Review.update(req.params.id, new Review(req.body), function(err, review) {

			if (err) {
				res.send(err);
			} else {
				res.json({

					error: false,
					message: "Review updated."

				});
			}
		});
	}	
};

// Delete
exports.delete = function(req, res) {

	// Run delete function from Review model
	Review.delete( req.params.id, function(err, review) {

		if (err) {
			res.send(err);
		} else {
			res.json({

				error: false,
				message: "Review deleted."

			});
		}
	});
};