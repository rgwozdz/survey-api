"use strict";
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const MiddlewareMock = require('./test-mocks/middleware-mock').MiddlewareMock;
const createDatabase = require('./test-mocks/test-database');
const getQuestions = require('../helpers/get-questions');

describe('GetQuestions tests', function() {

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

  describe('Test getQuestions', function() {

    it('Should return an object array with right properties ', function() {
      return getQuestions(db)
        .then(result=>{
          expect(result).to.be.an('array');
          result.forEach(item=>{
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