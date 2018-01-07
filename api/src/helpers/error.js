'use strict';
const path = require('path');
/**
 *
 * @param message - error message
 * @param status - HTTP status code
 * @param err - Error to pass on
 * @constructor
 */

const ServerError = function (message, err) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  if(err) {
    this.message = `${this.message}\n${err.message}`;
  }
  this.status = 500;
};

const RequestError = function (message, err) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  if(err) {
    this.message = `${this.message}\n${err.message}`;
  }
  this.status = 400;
};

module.exports = {ServerError, RequestError};
