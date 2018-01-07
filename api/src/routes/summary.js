'use strict';
const express = require('express');
const router = express.Router();
const createSummary = require('../helpers/create-summary');

/**
 *  /summary
 */
router.get('/summary', function (req, res, next) {

  createSummary(req)
    .then(summary=>{
      res.status(200).json(summary);
    })
    .catch(next);
});

module.exports = router;
