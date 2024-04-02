const express = require("express");
const bodyParser = require("body-parser");
const appRoutes = require("./routes/routes.js");

const app = express();
const fs = require("fs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

appRoutes(app, fs);

const server = app.listen(3001, () => {
  console.log("Listening on port %s...", server.address().port);
});
