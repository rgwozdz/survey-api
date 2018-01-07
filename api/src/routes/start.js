'use strict';
const express = require('express');
const router = express.Router();
const sessionUtils = require('../helpers/session-utils');

/**
 *  /start
 */
router.get('/start', [sessionUtils.sessionQuestionIndex, sessionUtils.sessionQuestions], function (req, res, next) {

  if(req.session.questionIndex > -1) {
    return res.redirect('/api/v1/next');
  }

  req.session.questionIndex = 0;
  return res.status(200).json(req.session.questions[0]);

});

module.exports = router;
