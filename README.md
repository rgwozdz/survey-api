# survey-api

If you have Docker and docker-compose you can fire up the API with:  

    $ docker-compose up

This should serve the API on port 8000.

The following services are available:

1) `http://localhost:8000/api/v1/start`  
This will start or restart the survey, and return the text of the first question and possible answer options.

2) `http://localhost:8000/api/v1/next?answer=<answer-option>`  
This service accepts the answers of the last delivered question, and returns the next question and answer options.

**Note:** if you hit this service prior to visiting `/api/v1/start`, your session just began, you'll be redirected to
`/api/v1/start`. If you have already completed all the question for the session, you'll be redirected to `/api/v1/summary`.

3) `http://localhost:8000/api/v1/summary`  
This service will summarize the state of the sessions survey.

You can view the test-report at `http://localhost:8000/public/`.

In addition, to the services here, I stubbed out a traditional REST versions of question and response services that
assume survey state would be stored on the client.  These aren't functional, just there for additional discussion.



A very trivial change (see, this is dependent on last PR)...to test Github.
