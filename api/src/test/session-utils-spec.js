"use strict";
const chai = require('chai');
const expect = chai.expect;
const MiddlewareMock = require('./test-mocks/middleware-mock').MiddlewareMock;
const sesstionUtils = require('../helpers/session-utils');

describe('SessionUtils tests', function() {

  before(function (done) {

    done();

  });

  // describe('Test _querySuperAdmin', function() {
  //
  //   it('Should add a specified properties to req.user ', function() {
  //     const mock = new MiddlewareUserMock(testData.nonsuperuser);
  //     return authorization._queryUserPermissions(mock.req, db, mock.next)
  //       .then(result=>{
  //         expect(mock.req.user).to.have.property('super_admin').to.equal(false);
  //         expect(mock.req.user).to.have.property('acl_groups').that.is.an('array');
  //       });
  //   });
  // });

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

  //After all tests are finished drop database and close connection
  after(function(done){
    done()
  });
});