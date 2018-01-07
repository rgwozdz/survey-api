'use strict';
const express = require('express');
const router = express.Router();

/**
 *  /start
 */
router.get('/start', function (req, res, next) {

  res.status(200).json({message: "tmp-stub"});

});


module.exports = router;
