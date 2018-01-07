"use strict";

/**
 * Middleware for redirecting requests to /api/v1/next that should be at 'start' or 'summary'
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

function nextRedirects(req, res, next) {

  // Redirect to /start is session indicates question not yet begun
  if(req.session.questionIndex === -1) {
    return res.redirect('/api/v1/start');
  }

  // Redirect to /summary if session index all question complete
  if(req.session.questionIndex > req.session.questions.length-1) {
    return res.redirect('/api/v1/summary');
  }

  return next();
}

module.exports = nextRedirects;