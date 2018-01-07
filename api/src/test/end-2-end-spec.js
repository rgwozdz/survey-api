"use strict";
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const testRequest = require('supertest');
const appPromise = require('../app');
const MiddlewareMock = require('./test-mocks/middleware-mock').MiddlewareMock;
const createDatabase = require('./test-mocks/test-database');
const getQuestions = require('../helpers/get-questions');

describe('End 2 end tests', function() {

  let db;
  let app;

  before(function (done) {
    mongoose.connect(`mongodb://mongo-store/test_get_questions`);
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {

      createDatabase(db)
        .then(result=>{
          // Get the express app
          return appPromise();
        })
        .then((promisedApp) => {
          app = promisedApp;
          app.set('db', db);
          done();
        })
        .catch(err=>{
          console.error(err);
          done();
          throw err;
        });
    });
  });

  it('GET /api/v1/start', (done)=>{

    let cookie;

    testRequest(app)
      .get('/api/v1/start')
      .then(res=>{
        // Test that the endpoint exists and responds with specified data
        expect(res).to.have.property('status', 200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('label', "Coffee or tea?");
        expect(res.body).to.have.property('answers').that.is.an('array');

        cookie = res.header['set-cookie'][0].split('; ')[0];

        return testRequest(app).get('/api/v1/next?answer=tea').set('Cookie', [cookie]);

      })
      .then(res=>{
        // Test that the endpoint exists and responds with specified data
        //console.log(res);
        expect(res).to.have.property('status', 200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('label', "Donuts or bagels?");
        expect(res.body).to.have.property('answers').that.is.an('array');

        done();//return testRequest(app).get('/api/v1/next?answer=bagels').set('Cookie', [cookie]);

      })
      // .then(res=>{
      //   // Test that the endpoint exists and responds with specified data
      //   expect(res).to.have.property('status', 200);
      //   expect(res.body).to.be.an('object');
      //   expect(res.body).to.have.property('label', "Cats or dogs?");
      //   expect(res.body).to.have.property('answers').that.is.an('array');
      //
      //   return testRequest(app).get('/api/v1/next?answer=dogs').set('Cookie', [cookie]);
      // })
      // .then(res=>{
      //   // Test that the endpoint exists and responds with specified data
      //   expect(res).to.have.property('status', 302);
      //   expect(res.header.location).to.equal('/api/v1/summary');
      //
      //   done();//return testRequest(app).get('/api/v1/summary').set('Cookie', [cookie]);
      // })
      // .then(res=>{
      //   // Test that the endpoint exists and responds with specified data
      //   expect(res).to.have.property('status', 200);
      //   // res.body.forEach(item=>{
      //   //   expect(item).to.have.property('question').that.is.a('string');
      //   //   expect(item).to.have.property('response').that.is.a('string');
      //   // })
      //   done();
      // })
      .catch(err=>{
        console.error(err);
        expect(err === undefined).to.equal(true);
        done();
      });
  });

  //After all tests are finished drop database and close connection
  after(function(done){
    db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
});