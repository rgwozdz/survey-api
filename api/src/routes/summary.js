'use strict';
const express = require('express');
const router = express.Router();

/**
 *  /summary
 */
router.get('/summary', function (req, res, next) {

  res.status(200).json({message: "tmp-stub"});

});


module.exports = router;
