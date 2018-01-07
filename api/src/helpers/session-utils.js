"use strict";
const getQuestions = require('./get-questions');
const errors = require('./error');

function sessionQuestionIndex(req, res, next){

  // Assign a current question index if currently undefined
  req.session.questionIndex = typeof req.session.questionIndex === 'undefined' ? -1 : req.session.questionIndex;

  if(!Number.isInteger(req.session.questionIndex)) {
    return next(new errors.ServerError(`Session question index has been mutated to a non-integer value.`));
  }
  // Allow survey reset
  if(req.path === '/api/v1/start') {
    req.session.questionIndex = -1;
  }

  return next();
}


function sessionQuestions(req, res, next) {

  if(typeof req.session.questions === 'object') {
    return next();
  }

  getQuestions(req.app.get('db'))
    .then(questions=>{
      req.session.questions = questions;
      return next();
    })
    .catch(next);
}

module.exports = {sessionQuestionIndex, sessionQuestions};
