FROM node:8.9.1
WORKDIR /usr/src
ADD src/ /usr/src
RUN npm install
#RUN npm install -g pm2
#RUN npm install -g raml2html
EXPOSE 8000
EXPOSE 5858
LABEL maintainer="rgwozdz@spatialdev.com"