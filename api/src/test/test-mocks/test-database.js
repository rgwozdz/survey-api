'use strict';
const questionSchema = require('../../models/questionSchema');

const questions = [
  {
  index: 1,
  label: "Coffee or tea?",
  answers: ["coffee", "tea"]
  },
  {
    index: 2,
    label: "Donuts or bagels?",
    answers: ["donuts", "bagels"]
  },
  {
    index: 3,
    label: "Cats or dogs?",
    answers: ["cats", "dogs"]
  }
];

const createDatabase = function(db){

  return new Promise((resolve, reject)=>{

    const Question = db.model('Question', questionSchema);

    Question.insertMany(questions)
      .then(resolve)
      .catch(reject);

  });
};

module.exports = createDatabase;