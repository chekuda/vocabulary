# CHECKUDAS-VOCABULARY-API

  I will use this as a template for my next projects which needs an express server in the BackEnd.
  Also a REST API will be set up here

  ### Run it Localy
    npm install
    Afterwards I will have to run two servers.
      FrontEnd: npm run --prefix ./client/ start
      BackEnd: npm start
    `ie: localhost:3000//api/getvocabulary/vocabulary.json`

  ### Run it in the server
    copy data from .env and npm install
    Stop Servers already running. ie: forever list and forever stop ${uid}
    Afterwards I will have to run two servers.
      FrontEnd: forever start -a --uid frontEnd -c "npm start" ./client
      BackEnd: forever start -a --uid server server.js
    `ie: localhost:3000//api/getvocabulary/vocabulary.json`

  ### REST API
    All the server configuration is inside the `server-config` folder where you can find routes and controllers

  ### Common paths
    All the paths will be gather in this file `common-paths` in order to get a order of all the relative paths

