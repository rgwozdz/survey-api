"use strict";
const errors = require('./error');

function answerValidation(req, res, next) {

  // Validation
  if(!{}.hasOwnProperty.call(req.query, 'answer')) {
    return next(new errors.RequestError('Please include answer for the question with the "?answer=" parameter'))
  }

  if(req.query.answer instanceof Array) {
    return next(new errors.RequestError('Please provide a single answer with the "?answer=" parameter'))
  }

  if (req.session.questions[req.session.questionIndex].answers.indexOf(req.query.answer) === -1) {
    return next(new errors.RequestError(`Invalid answer. Question was "${req.session.questions[req.session.questionIndex].label}"`));
  }

  return next();
}


module.exports = answerValidation;