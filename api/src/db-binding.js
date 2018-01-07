'use strict';
const mongoose = require('mongoose');
let db = Object.create(null);

/**
 * [description]
 * @return Promise Get a promise for connecting to mongo store
 */
const connect = function() {
  return new Promise((resolve, reject)=>{
      let dbConn = mongoose.createConnection(`mongodb://mongo-store/survey_data`);

      dbConn.once('open', function() {
        resolve(dbConn);
      });

      dbConn.on('error', (err)=>{
        reject(err);
      });
  });

};

const get = ()=>{
  if(db === undefined) {
    throw new Error('db connection is not defined.');
  }
  return db
};

module.exports = {get, connect};
