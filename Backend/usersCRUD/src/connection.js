const { Client } = require("pg");
const config = require("../config.env");
const client = new Client(config);


client
  .connect()
  .then(() => console.log("Connected DB Successfully"))
  .catch(() => console.log("Connection Error"));

module.exports = client;
