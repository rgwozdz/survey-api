/**
 * Simple node program to seed one user to mongo db datastore
 *
 */

"use strict";
const mongoose = require('mongoose');
const createTestDatabase = require('./test/test-mocks/test-database');

let db = mongoose.createConnection(`mongodb://mongo-store/survey_data`);

db.once('open', function() {
    // drop database upon successful connection
    db.dropDatabase(function(){

      createTestDatabase(db)
        .then(result => {
          db.close()
          process.exit();
        })
        .catch(err=>{
          console.error(err)
          db.close()
          process.exit(1);
        })
    });

});

db.on('error', (err)=>{
    console.error(err);
    process.exit(1);
});