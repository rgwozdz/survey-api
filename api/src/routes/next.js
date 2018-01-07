'use strict';
const express = require('express');
const router = express.Router();

/**
 *  /next
 */
router.get('/next', function (req, res, next) {

  res.status(200).json({message: "tmp-stub"});

});


module.exports = router;
