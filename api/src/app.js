"use strict";
const express = require('express');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require("cors");
const db = require('./db-binding');

const appPromise = ()=>{

  return new Promise((resolve, reject)=>{

    db.connect()
      .then((db)=>{

        // Create the express instance
        const app = express();
        // Create the router
        const router = express.Router();

        app.set('db', db);

        // Trust forwarded headers from Nginx
        app.set('truxt_proxy', true);

        //Remove powered by header
        app.disable('x-powered-by');

        // compress all requests: gzip/deflate
        app.use(compression());

        // CORS
        app.use(cors());

        // Body parser - parse body of POSTs
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        // Set static public directory
        app.use('/public', express.static(path.join(__dirname, 'public')));


        // Add "/api" prefix to all routes
        app.use('/api', router);
        app.use('/api/v1', require('./routes/start'));
        app.use('/api/v1', require('./routes/next'));
        app.use('/api/v1', require('./routes/summary'));

        app.get('/api/v1/test', (req, res, next)=>{
          res.status(200).json({"message":"Hello"});
        });

        // Service Error Handler;
        app.use(function (err, req, res, next) {

          let status = err.status || 500;
          let message = err.message;

          if(app.get('env') === 'production') {
            err = {};
          }

          res.status(status).json({
            message: message,
            error: err
          });
        });

        resolve(app);
      })
      .catch(err=> {reject(err)})

  })
};

module.exports = appPromise;
