# survey-api

If you have Docker and docker-compose you can fire up the API with:  

    $ docker-compose up
    
This should server the API on port 8000.

The following services are available:

1) `http://localhost:8000/api/v1/start`

2) `http://localhost:8000/api/v1/next`;  Note, if your session just began, you'll be redirected to `/api/v1/start`. If you have already completed all the question for the session, you'll be redirected to `/api/v1/summary`.

3) `http://localhost:8000/api/v1/summary`

You can view the test-report at `http://localhost:8000/public/`.

In addition, to the services in the coding challenging, I stubbed out a traditional REST versions of question and response services that assume logic and state would be on the client.  These aren't functional, just there for additional discussion.