'use strict';
const express = require('express');
const router = express.Router();
const sessionUtils = require('../helpers/session-utils');

/**
 *  /questions - GET ALL questions
 */
router.get('/questions', function (req, res, next) {

  // Here we would fetch all questions or an empty array if none exist
  return res.status(200).json(/* questions*/);

});

/**
 *  /questions - GET ONE question
 */
router.get('/questions/:id', function (req, res, next) {

  /* Here we would fetch one question for submitted id. If it doesn't exist, return 404*/
  return res.status(200).json({});

});

module.exports = router;
