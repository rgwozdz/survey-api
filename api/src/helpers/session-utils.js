"use strict";
const getQuestions = require('./get-questions');
const errors = require('./error');

/**
 * Middleware for creating the session question index
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function sessionQuestionIndex(req, res, next){

  // Assign a current question index if currently undefined
  req.session.questionIndex = typeof req.session.questionIndex === 'undefined' ? -1 : req.session.questionIndex;

  // Make sure the question index is an integer!
  if(!Number.isInteger(req.session.questionIndex)) {
    return next(new errors.ServerError(`Session question index has been mutated to a non-integer value.`));
  }
  // Allow survey reset
  if(req.path === '/api/v1/start') {
    req.session.questionIndex = -1;
  }

  return next();
}

/**
 * Middleware for getting the questions to be used for this session
 * @param req
 * @returns {Promise}
 */
function sessionQuestions(req) {
  return new Promise((resolve, reject)=>{

    getQuestions(req.app.get('db'))
      .then(questions=>{
        // Lock the questions
        req.session.questions = questions;
        Object.defineProperty(req.session, "questions", { configurable: false, writable: false });
        resolve();
      })
      .catch(reject);
  });
}

module.exports = {sessionQuestionIndex, sessionQuestions};
