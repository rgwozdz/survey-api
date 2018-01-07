"use strict";
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const MiddlewareMock = require('./test-mocks/middleware-mock').MiddlewareMock;
const createDatabase = require('./test-mocks/test-database');
const sesstionUtils = require('../helpers/session-utils');

describe('SessionUtils tests', function() {

  let db;
  before(function (done) {
    mongoose.connect(`mongodb://mongo-store/test_get_questions`);
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {

      createDatabase(db)
        .then(result=>{
          done();
        })
        .catch(err=>{
          console.error(err);
          done();
          throw err;
        });
    });
  });

  describe('Test sessionQuestionIndex', function() {

    it('Sessions not yet assigned a questionIndex should get one equal to -1', function() {
      const mock = new MiddlewareMock();
      sesstionUtils.sessionQuestionIndex(mock.req, mock.res, mock.next);
      expect(mock.req.session.questionIndex).to.equal(-1);
    });

    it('Sessions already assigned a questionIndex integer should keep it intact', function() {
      const mock = new MiddlewareMock();
      mock.req.session.questionIndex = 1;
      sesstionUtils.sessionQuestionIndex(mock.req, mock.res, mock.next);
      expect(mock.req.session.questionIndex).to.equal(1);
    });

    it('Should get a 500 when session questionIndex is mutated to non-integer', function() {
      const mock = new MiddlewareMock();
      mock.req.session.questionIndex = 'LOL';
      sesstionUtils.sessionQuestionIndex(mock.req, mock.res, mock.next);
      expect(mock.testError.status).to.equal(500);
    });

  });

  describe('Test sessionQuestions', function() {

    it('Should create a questions property on the req.session object that is an object array with right properties ', function () {
      const mock = new MiddlewareMock();
      mock.req.app.set('db', db);
      return sesstionUtils.sessionQuestions(mock.req)
        .then(result => {
          expect(mock.req.session).to.have.property('questions').that.is.an('array');
          mock.req.session.questions.forEach(item => {
            expect(item).to.have.property('label').that.is.a('string');
            expect(item).to.have.property('answers').that.is.an('array');
          })
        });
    });
  });

  //After all tests are finished drop database and close connection
  after(function(done){
    db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
});