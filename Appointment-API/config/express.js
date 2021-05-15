const express = require("express");

const cors = require("cors");

const helmet = require("helmet");

const app = express();

const bodyParser = require("body-parser");

const routerControls = require("../routes/router");

const sequelize = require("../config/database/sql");

const defaultData = require("./../models/feeder");

// enable cors
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);

// use helmet - secure headers
app.use(helmet());

// set server port
app.set("port", process.env.PORT);

// set server hostname
app.set("hostname", process.env.HOSTNAME);

// set environment variable
app.set("env", process.env.NODE_ENV);

// set environment description
app.set("env-desc", process.env.NODE_ENV_DESC);

// set db-reset variable
const dbReset = process.env.DB_RESET == "true" ? true : false;

sequelize
  .sync({
    // force: dbReset,
    // alter: true,
  })
  .then(() => {
    if (dbReset) {
      defaultData.FeedRoot();
    }
    // start node-server
    const server = app.listen(app.get("port"), app.get("hostname"), () => {
      const port = server.address().port;
      const address = server.address().address;
      console.log(
        "ExpressJS listening on address " + address + " with port " + port
      );
      console.log(
        "Env. Details:",
        app.get("env") + " - " + app.get("env-desc")
      );
    });

    global.appServer = server;
    app.emit( "app_started" )
  })
  .catch((err) => {
    console.log(err);
  });

// parsing raw json
app.use(bodyParser.json());

// parsing x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// execute api routes
app.use("/", routerControls.apiRoutes);

module.exports = {
  appServer: app,
};
