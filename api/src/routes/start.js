'use strict';
const express = require('express');
const router = express.Router();
const sessionUtils = require('../helpers/session-utils');

/**
 *  /start
 */
router.get('/start',
  [
    sessionUtils.sessionQuestionIndex,
    (req, res, next)=>{
      sessionUtils.sessionQuestions(req)
      .then(() => next())
      .catch(next)
    }
  ], function (req, res, next) {

  req.session.questionIndex = 0;
  return res.status(200).json(req.session.questions[0]);

});

module.exports = router;
