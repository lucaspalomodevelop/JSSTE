var engine = require("./src/engine");
var app = {};
app.config = {
  templatePath: __dirname + "\\src\\templates",
  pagePath: __dirname + "\\src\\pages",
};

app.render = engine.render;
app.CONST = engine.CONST;

module.exports = app;
