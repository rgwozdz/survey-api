"use strict";
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const MiddlewareMock = require('./test-mocks/middleware-mock').MiddlewareMock;
const createDatabase = require('./test-mocks/test-database');
const getQuestions = require('../helpers/get-questions');
const createSummary = require('../helpers/create-summary');

describe('CreateSummary tests', function() {

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

  describe('Test createSummary', function() {

    it('Should return an summary object array with right properties even though no req.session.questions', function() {
      const mock = new MiddlewareMock();
      mock.req.app.set('db', db);
      return createSummary(mock.req)
        .then(result=>{
          expect(result).to.be.an('array');
          result.forEach(item=>{
            expect(item).to.have.property('question').that.is.a('string');
            expect(item).to.have.property('response').that.is.an('string');
          })
        });
    });

    it('Should return an summary object array with right properties given there is a req.session.questions', function() {
      const mock = new MiddlewareMock();
      mock.req.app.set('db', db);
       mock.req.session.questions = questions;

      return createSummary(mock.req)
        .then(result=>{
          expect(result).to.be.an('array');
          result.forEach(item=>{
            expect(item).to.have.property('question').that.is.a('string');
            expect(item).to.have.property('response').that.is.a('string');
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