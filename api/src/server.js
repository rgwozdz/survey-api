'use strict';
const appPromise = require('./app.js');

appPromise()
  .then((app)=>{
    // Start the API listening
    let apiPort = process.env.API_PORT || 8000;
    app.listen(apiPort, function(){
      console.log(`SurveyAPI listening on port ${apiPort}.`);
    }).on('error', function(err){
      console.error(`Failed to start API:\n${err}`);
      process.exit(1);
    });
  })
  .catch(err=>{
    console.error(err);
    //test
  });
