var engine = require("./engine");
const mergeJson = require("./jsonMerger");
const fs = require("fs");
const path = require("path");
var app = {};

app.render = engine.render;
app.CONST = engine.CONST;

let pj = require("../package.json");

app.info = {};
app.info["version"] = pj.version;
app.info["license"] = pj.license;
/**
 * Render File
 * @param {*} filePath
 * @returns
 */
app.renderFile = (filePath, templatePath) => {
  app.setState({ status: 0, statusMSG: "read file" });
  let file = fs.readFileSync(filePath, "utf8");
  app.setState({ status: 0, statusMSG: "parse file" });
  file = JSON.parse(file);
  app.setState({ status: 0, statusMSG: "set Selfpath" });
  file["_SELFPATH_"] = path.dirname(filePath);

  if (!(templatePath == undefined)) {
    app.setState({ status: 0, statusMSG: "read template" });
    let temp = fs.readFileSync(templatePath, "utf8");
    return engine.render(file, temp);
  } else {
    return engine.render(file);
  }
};

/**
 * set State
 * @param {*} param0
 */
app.setState = ({ status, statusMSG }) => {
  if (app.stateCallback != undefined) {
    app.stateCallback({ status, statusMSG });
  }
};

/**
 * Set function that would called by new state
 * @param {*} callback
 */
app.setStateFunction = function (callback) {
  app.stateCallback = callback;
  app.setState({ status: 0, statusMSG: "set Statefunction" });
  app.setState({ status: 0, statusMSG: "JSSTE is ready" });
};

app.__config = require("./config");
app.config = app.__config.getConfig();
engine.log = app.log;
engine.setState = app.setState;

module.exports = app;
