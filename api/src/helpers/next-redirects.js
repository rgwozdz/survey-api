"use strict";

function nextRedirects(req, res, next) {

  if(req.session.questionIndex === -1) {
    return res.redirect('/api/v1/start');
  }

  if(req.session.questionIndex > req.session.questions.length-1) {
    return res.redirect('/api/v1/summary');
  }

  return next();
}

module.exports = nextRedirects;