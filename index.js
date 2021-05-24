var engine = require("./src/modules/engine");
var app = {};
app.config = {
  templatePath: __dirname + "\\src\\templates",
  pagePath: __dirname + "\\src\\pages",
};

app.render = engine.render;

module.exports = app;
