'use strict';
const express = require('express');
const router = express.Router();


/**
 *  /questions/:id/response - POST a new response to a question
 */
router.get('/questions/:id/response', function (req, res, next) {

  /**
   * Here we would:
   * 1) ensure question id is valid and if not send 400 response
   * 2) validate submitted answer
   * 3) add answer to session summary
  */

  return res.status(201).send();

});


/**
 *  /questions/:id/response - GET the response to a previously answered question
 */
router.get('/questions/:id/response', function (req, res, next) {

  /**
   * Here we would:
   * 1) ensure question id is valid and if not send 404 response
   * 2) retrieve response details from session summary for question with submitted id
   */

  return res.status(200).json(/* response details */);

});

module.exports = router;
