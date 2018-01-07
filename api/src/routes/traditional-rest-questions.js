'use strict';
const express = require('express');
const router = express.Router();
const sessionUtils = require('../helpers/session-utils');

/**
 *  /questions - GET ALL questions
 */
router.get('/questions', function (req, res, next) {

  return res.status(200).json({});

});

/**
 *  /questions - GET ONE question
 */
router.get('/questions/:id', function (req, res, next) {

  return res.status(200).json({});

});

module.exports = router;
