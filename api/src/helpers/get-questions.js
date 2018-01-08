"use strict";

let questionSchema = require('../models/questionSchema');

/**
 *  Helper to fetch survey questions.
 * @param db
 * @returns {Promise}
 */
function getQuestions(db) {

  return new Promise((resolve, reject)=>{
    const Question = db.model('Question', questionSchema);
    Question.find({})
      .select('-_id label answers')
      .sort('index')
      .lean()
      .exec((err, questions)=>{
        if(err) {
          return reject(err);
        }
        if(questions.length === 0) {
          reject(new Error('No questions found in database.'))
        }
        questions.forEach(item=>{
          Object.defineProperty(item, "label", { configurable: false, writable: false });
          Object.defineProperty(item, "answers", { configurable: false, writable: false });
        })
        return resolve(questions);
      });
  });
};

module.exports = getQuestions;