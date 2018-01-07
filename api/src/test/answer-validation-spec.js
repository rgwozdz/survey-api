"use strict";
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const MiddlewareMock = require('./test-mocks/middleware-mock').MiddlewareMock;
const createDatabase = require('./test-mocks/test-database');
const answerValidation = require('../helpers/answer-validation');
const getQuestions = require('../helpers/get-questions');

describe('AnswerValidation tests', function() {

  let questions;
  let db;
  before(function (done) {
    mongoose.connect(`mongodb://mongo-store/test_answer_validation`);
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {

      createDatabase(db)
        .then(result=>{
          return getQuestions(db);
        })
        .then(result=>{
          questions = result;
          done();
        })
        .catch(err=>{
          console.error(err);
          done();
          throw err;
        });
    });
  });

  describe('Test answerValidation', function() {

    it('Requests without "answer" parameter should return 400 error', function() {
      const mock = new MiddlewareMock();
      answerValidation(mock.req, mock.res, mock.next);
      expect(mock.testError.status).to.equal(400);
    });

    it('Requests with multiple "answer" parameters as array should return 400 error', function() {
      const mock = new MiddlewareMock();
      mock.req.query.answer = ['bagels', 'donuts'];
      answerValidation(mock.req, mock.res, mock.next);
      expect(mock.testError.status).to.equal(400);
    });

    it('Requests with invalid answers should return 400 error', function() {
      const mock = new MiddlewareMock();
      mock.req.query.answer = 'goldfish';
      mock.req.session.questions = questions;
      mock.req.session.questionIndex = 2;
      answerValidation(mock.req, mock.res, mock.next);
      expect(mock.testError.status).to.equal(400);
    });

    it('Requests with matched should continue', function() {
      const mock = new MiddlewareMock();
      mock.req.query.answer = 'dogs';
      mock.req.session.questions = questions;
      mock.req.session.questionIndex = 2;
      answerValidation(mock.req, mock.res, mock.next);
      expect(mock.testError).to.equal(null);
    });

  });

  //After all tests are finished drop database and close connection
  after(function(done){
    db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
});