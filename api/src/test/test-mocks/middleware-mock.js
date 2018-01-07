'use strict';

class MiddlewareMock {
  constructor() {
    const _settings = {};

    this.redirectedPath = null;

    this.req = {

      body: Object.create(null),
      query: Object.create(null),
      params:  Object.create(null),
      session: Object.create(null),
      app: {
        get: (key)=>{
          return _settings[key]
        },
        set: (key, value)=>{
          _settings[key] = value;
        }
      },
    };
    this.res = {
      redirect : (path)=>{
        this.redirectedPath = path;
      }
    };
    this.testError = null;
    this.next = (err)=>{ return this.testError = err || null };
  }
}

module.exports = {
  MiddlewareMock
};
