'use strict';
const express = require('express');
const router = express.Router();

/**
 *  /summary
 */
router.get('/summary', function (req, res, next) {

  let summary = req.session.questions.map(item=>{
    return {question: item.label, response: item.response || `Not yet answered`};
  });

  res.status(200).json(summary);

});


module.exports = router;
