"use strict";
const getQuestions = require('./get-questions');

/**
 * Helper function to create a survey summary;  allows for case that session questions may not yet have been issued
 * @param req
 * @returns {Promise}
 */
function createSummary(req) {

  return new Promise((resolve, reject)=>{

    if({}.hasOwnProperty.call(req.session, 'questions')){
      resolve(req.session.questions.map(item=>{
        return {question: item.label, response: item.response || `Not yet answered`};
      }));
    }

    getQuestions(req.app.get('db'))
      .then((questions)=>{
        resolve(questions.map(item=>{
          return {question: item.label, response: `Not yet answered`};
        }));
      })
      .catch(reject)
  });
};


module.exports = createSummary;