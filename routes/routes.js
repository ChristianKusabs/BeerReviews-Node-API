"use strict";
const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/review.controller');

// Setup routes with our review controller
router.get('/', reviewController.returnAll);
router.post('/', reviewController.create);
router.get('/:id', reviewController.returnByID);
router.put('/:id', reviewController.update);
router.delete('/:id', reviewController.delete);

module.exports = router;