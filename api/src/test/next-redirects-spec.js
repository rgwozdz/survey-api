"use strict";
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const MiddlewareMock = require('./test-mocks/middleware-mock').MiddlewareMock;
const createDatabase = require('./test-mocks/test-database');
const getQuestions = require('../helpers/get-questions');
const nextRedirects = require('../helpers/next-redirects');

describe('SessionUtils tests', function() {

  let questions;
  let db;
  before(function (done) {
    mongoose.connect(`mongodb://mongo-store/test_next_redirects`);
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

  describe('Test nextRedirects', function() {

    it('Sessions with a question index of -1 should be sent to /api/v1/start', function() {
      const mock = new MiddlewareMock();
      mock.req.session.questionIndex = -1;
      nextRedirects(mock.req, mock.res, mock.next);
      expect(mock.redirectedPath).to.equal('/api/v1/start');
    });

    it('Sessions with a question index of > total questions should be sent to /api/v1/summary', function() {
      const mock = new MiddlewareMock();
      mock.req.session.questionIndex = questions.length;
      mock.req.session.questions = questions;
      nextRedirects(mock.req, mock.res, mock.next);
      expect(mock.redirectedPath).to.equal('/api/v1/summary');
    });
  });

  //After all tests are finished drop database and close connection
  after(function(done){
    db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
});