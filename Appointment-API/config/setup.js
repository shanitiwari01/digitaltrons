const dotEnv = require("custom-env");

// default env file
dotEnv.env();
console.log("default config loaded !!!");

const express = require("./express");

module.exports = {
  express: express
};
