'use strict';
const express = require('express');
const router = express.Router();
const sessionQuestion = require('../helpers/session-utils');
const nextRedirects = require('../helpers/next-redirects');
const answerValidation = require('../helpers/answer-validation');

/**
 *  /next
 */
router.get('/next', [sessionQuestion.sessionQuestionIndex, nextRedirects, answerValidation], function (req, res, next) {

  req.session.questions[req.session.questionIndex].response = req.query.answer;
  req.session.questionIndex++;

  if(req.session.questionIndex === req.session.questions.length) {
    return res.redirect('/api/v1/summary');
  }

  return res.status(200).json(req.session.questions[req.session.questionIndex]);


});


module.exports = router;
