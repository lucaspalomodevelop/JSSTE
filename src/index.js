var engine = require("./engine");
const mergeJson = require("./jsonMerger");
const fs = require("fs");
const path = require("path");
var app = {};

app.render = engine.render;
app.CONST = engine.CONST;
app.renderFile = (filePath) => {
  this.setState({ status: 0, statusMSG: "read file" });
  let file = fs.readFileSync(filePath, "utf8");
  this.setState({ status: 0, statusMSG: "parse file" });
  file = JSON.parse(file);
  this.setState({ status: 0, statusMSG: "set Selfpath" });
  file["_SELFPATH_"] = path.dirname(filePath);
  return engine.render(file);
};

app.setState = ({ status, statusMSG }) => {
  if (app.stateCallback != undefined) {
    app.stateCallback({ status, statusMSG });
  }
};

app.setStateFunction = function (callback) {
  app.stateCallback = callback;
  this.setState({ status: 0, statusMSG: "set Statefunction" });
  this.setState({ status: 0, statusMSG: "JSSTE is ready" });
};

// app.log = function({status, statusMSG}){

// };
// engine.config = app.config;
app.__config = require("./config");
app.config = app.__config.getConfig();
engine.log = app.log;
engine.setState = app.setState;

// app.expressEngine = (
//   config = {
//     templatePath: "templates",
//     pagePath: "pages",
//   }
// ) => {
//   config = mergeJson.mergeJson(app.config, config);
//   let hasrendered = false;
//   return (filePath, options, callback) => {
//     if (!hasrendered) {
//       app.config.templatePath = path.join(
//         options.settings.views,
//         config.templatePath
//       );
//       app.config.pagePath = path.join(options.settings.views, config.pagePath);
//       hasrendered = true;
//     }
//     // define the template engine
//     fs.readFile(filePath, function (err, content) {
//       content = content.toString();
//       // content = mergeJson.mergeJson(JSON.parse(content), options);

//       if (err) return callback(new Error(err));
//       // this is an extremely simple template engine
//       var rendered = app.render(content);
//       return callback(null, rendered);
//     });
//   };
// };

module.exports = app;
