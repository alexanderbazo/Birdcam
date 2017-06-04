/* eslint-env node */
var express = require("express"),
  app = express();
app.use(express.static('build'));
app.listen(8000);
