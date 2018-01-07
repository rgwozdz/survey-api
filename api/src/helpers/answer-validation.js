"use strict";
const errors = require('./error');

/**
 * Middleware for validating query parameters sent to /api/v1/next
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function answerValidation(req, res, next) {

  // Make sure there is an answer
  if(!{}.hasOwnProperty.call(req.query, 'answer')) {
    return next(new errors.RequestError('Please include answer for the question with the "?answer=" parameter'))
  }

  // No multiple answers
  if(req.query.answer instanceof Array) {
    return next(new errors.RequestError('Please provide a single answer with the "?answer=" parameter'))
  }

  // Answer must be one of the choices
  if (req.session.questions[req.session.questionIndex].answers.indexOf(req.query.answer) === -1) {
    return next(new errors.RequestError(`Invalid answer. Question was "${req.session.questions[req.session.questionIndex].label}"`));
  }

  return next();
}


module.exports = answerValidation;